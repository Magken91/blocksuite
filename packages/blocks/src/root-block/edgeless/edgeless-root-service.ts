import type {
  FrameBlockModel,
  GroupElementModel,
  ReferenceInfo,
} from '@blocksuite/affine-model';
import type { BlockServiceOptions } from '@blocksuite/block-std';
import type { IBound } from '@blocksuite/global/utils';

import { clamp } from '@blocksuite/affine-shared/utils';
import { type PointTestOptions, Viewport } from '@blocksuite/block-std/gfx';
import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { Bound, getCommonBound, last } from '@blocksuite/global/utils';
import { type BlockModel, Slot } from '@blocksuite/store';

import type {
  CanvasElementType,
  ConnectorElementModel,
} from '../../surface-block/element-model/index.js';
import type { SurfaceBlockModel } from '../../surface-block/index.js';
import type { ReorderingDirection } from '../../surface-block/managers/layer-manager.js';
import type { SurfaceContext } from '../../surface-block/surface-block.js';
import type { EdgelessToolConstructor } from './services/tools-manager.js';
import type { EdgelessTool } from './types.js';

import { SurfaceGroupLikeModel } from '../../surface-block/element-model/base.js';
import { MindmapElementModel } from '../../surface-block/index.js';
import { LayerManager } from '../../surface-block/managers/layer-manager.js';
import { compare } from '../../surface-block/managers/layer-utils.js';
import { getSurfaceBlock } from '../../surface-ref-block/utils.js';
import { RootService, type TelemetryEvent } from '../root-service.js';
import { GfxBlockModel } from './block-model.js';
import { EdgelessFrameManager } from './frame-manager.js';
import { EdgelessSelectionManager } from './services/selection-manager.js';
import { TemplateJob } from './services/template.js';
import {
  createInsertPlaceMiddleware,
  createRegenerateIndexMiddleware,
  createStickerMiddleware,
  replaceIdMiddleware,
} from './services/template-middlewares.js';
import { EdgelessToolsManager } from './services/tools-manager.js';
import { FIT_TO_SCREEN_PADDING } from './utils/consts.js';
import { getCursorMode } from './utils/query.js';
import { EdgelessSnapManager } from './utils/snap-manager.js';
import {
  ZOOM_INITIAL,
  ZOOM_MAX,
  ZOOM_MIN,
  ZOOM_STEP,
  type ZoomAction,
} from './utils/zoom.js';

export type ElementCreationSource =
  | 'shortcut'
  | 'toolbar:general'
  | 'toolbar:dnd'
  | 'canvas:drop'
  | 'canvas:draw'
  | 'canvas:dbclick'
  | 'canvas:paste'
  | 'context-menu'
  | 'ai'
  | 'internal'
  | 'conversation'
  | 'manually save';

declare module '@blocksuite/blocks' {
  interface ElementCreationEvent extends TelemetryEvent {
    segment?: 'toolbar' | 'whiteboard' | 'right sidebar';
    page: 'whiteboard editor';
    module?: 'toolbar' | 'canvas' | 'ai chat panel';
    control?: ElementCreationSource;
  }

  export interface TelemetryEventMap {
    CanvasElementAdded: ElementCreationEvent;
  }
}

export class EdgelessRootService extends RootService implements SurfaceContext {
  private _frame: EdgelessFrameManager;

  private _layer: LayerManager;

  private _selection: EdgelessSelectionManager;

  private _snap: EdgelessSnapManager;

  private _surface: SurfaceBlockModel;

  private _tool: EdgelessToolsManager;

  private _viewport: Viewport;

  TemplateJob = TemplateJob;

  slots = {
    edgelessToolUpdated: new Slot<EdgelessTool>(),
    pressShiftKeyUpdated: new Slot<boolean>(),
    cursorUpdated: new Slot<string>(),
    copyAsPng: new Slot<{
      blocks: BlockSuite.EdgelessBlockModelType[];
      shapes: BlockSuite.SurfaceModel[];
    }>(),
    readonlyUpdated: new Slot<boolean>(),
    draggingAreaUpdated: new Slot(),
    navigatorSettingUpdated: new Slot<{
      hideToolbar?: boolean;
      blackBackground?: boolean;
      fillScreen?: boolean;
    }>(),
    navigatorFrameChanged: new Slot<FrameBlockModel>(),
    fullScreenToggled: new Slot(),

    elementResizeStart: new Slot(),
    elementResizeEnd: new Slot(),
    toggleNoteSlicer: new Slot(),

    docLinkClicked: new Slot<ReferenceInfo>(),
    tagClicked: new Slot<{ tagId: string }>(),
    toolbarLocked: new Slot<boolean>(),
  };

  constructor(options: BlockServiceOptions) {
    super(options);
    const surface = getSurfaceBlock(this.doc);
    if (!surface) {
      throw new BlockSuiteError(
        ErrorCode.NoSurfaceModelError,
        'This doc is missing surface block in edgeless.'
      );
    }
    this._surface = surface;
    this._layer = LayerManager.create(this.doc, this._surface);
    this._frame = new EdgelessFrameManager(this);
    this._snap = new EdgelessSnapManager(this);
    this._viewport = new Viewport();
    this._selection = new EdgelessSelectionManager(this);
    this._tool = EdgelessToolsManager.create(this, []);
  }

  private _initReadonlyListener() {
    const doc = this.doc;

    let readonly = doc.readonly;
    this.disposables.add(
      doc.awarenessStore.slots.update.on(() => {
        if (readonly !== doc.readonly) {
          readonly = doc.readonly;
          this.slots.readonlyUpdated.emit(readonly);
        }
      })
    );
  }

  private _initSlotEffects() {
    const { disposables, slots } = this;

    disposables.add(
      slots.edgelessToolUpdated.on(edgelessTool => {
        slots.cursorUpdated.emit(getCursorMode(edgelessTool));
      })
    );

    disposables.add(
      slots.pressShiftKeyUpdated.on(pressed => {
        this.tool.shiftKey = pressed;
      })
    );
  }

  addBlock(
    flavour: string,
    props: Record<string, unknown>,
    parent?: string | BlockModel,
    parentIndex?: number
  ) {
    props['index'] = this.generateIndex(flavour);

    this.editPropsStore.applyLastProps(
      flavour as BlockSuite.EdgelessModelKeys,
      props
    );

    return this.doc.addBlock(flavour as never, props, parent, parentIndex);
  }

  addElement<T = Record<string, unknown>>(type: string, props: T) {
    // @ts-ignore
    if (props['index'] === undefined) {
      // @ts-ignore
      props['index'] = this.generateIndex(type);
    }

    // @ts-ignore
    props['type'] = type;

    this.editPropsStore.applyLastProps(
      type as CanvasElementType,
      props as Record<string, unknown>
    );

    return this._surface.addElement(props as T & { type: string });
  }

  createGroup(elements: BlockSuite.EdgelessModel[] | string[]) {
    const groups = this.elements.filter(
      el => el.type === 'group'
    ) as GroupElementModel[];
    const groupId = this.addElement('group', {
      children: elements.reduce(
        (pre, el) => {
          const id = typeof el === 'string' ? el : el.id;
          pre[id] = true;
          return pre;
        },
        {} as Record<string, true>
      ),
      title: `Group ${groups.length + 1}`,
    });

    return groupId;
  }

  createGroupFromSelected() {
    const { selection } = this;

    if (
      selection.selectedElements.length === 0 ||
      !selection.selectedElements.every(
        element =>
          element.group === selection.firstElement.group &&
          !(element.group instanceof MindmapElementModel)
      )
    ) {
      return;
    }

    const parent = selection.firstElement.group as GroupElementModel;

    if (parent !== null) {
      selection.selectedElements.forEach(element => {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        parent.removeChild(element.id);
      });
    }

    const groupId = this.createGroup(selection.selectedElements);

    if (parent !== null) {
      parent.addChild(groupId);
    }

    selection.set({
      editing: false,
      elements: [groupId],
    });

    return groupId;
  }

  createTemplateJob(type: 'template' | 'sticker') {
    const middlewares: ((job: TemplateJob) => void)[] = [];

    if (type === 'template') {
      const currentContentBound = getCommonBound(
        (
          this.blocks.map(block => Bound.deserialize(block.xywh)) as IBound[]
        ).concat(this.elements)
      );

      if (currentContentBound) {
        currentContentBound.x +=
          currentContentBound.w + 20 / this.viewport.zoom;
        middlewares.push(createInsertPlaceMiddleware(currentContentBound));
      }

      const idxGenerator = this.layer.createIndexGenerator(true);

      middlewares.push(
        createRegenerateIndexMiddleware((type: string) => idxGenerator(type))
      );
    }

    if (type === 'sticker') {
      middlewares.push(
        createStickerMiddleware(this.viewport.center, () =>
          this.layer.generateIndex('affine:image')
        )
      );
    }

    middlewares.push(replaceIdMiddleware);

    return TemplateJob.create({
      model: this.surface,
      type,
      middlewares,
    });
  }

  generateIndex(type: string) {
    // @ts-ignore
    return this._layer.generateIndex(type);
  }

  getConnectors(element: BlockSuite.EdgelessModel | string) {
    const id = typeof element === 'string' ? element : element.id;

    return this.surface.getConnectors(id) as ConnectorElementModel[];
  }

  getElementById(id: string): BlockSuite.EdgelessModel | null {
    const el =
      this._surface.getElementById(id) ??
      (this.doc.getBlockById(id) as BlockSuite.EdgelessBlockModelType | null);
    return el;
  }

  getElementsByType<K extends keyof BlockSuite.SurfaceElementModelMap>(
    type: K
  ): BlockSuite.SurfaceElementModelMap[K][] {
    return this.surface.getElementsByType(type);
  }

  getFitToScreenData(
    padding: [number, number, number, number] = [0, 0, 0, 0],
    inputBounds?: Bound[]
  ) {
    let bounds = [];
    if (inputBounds && inputBounds.length) {
      bounds = inputBounds;
    } else {
      this.blocks.forEach(block => {
        bounds.push(Bound.deserialize(block.xywh));
      });

      const surfaceElementsBound = getCommonBound(this.elements);
      if (surfaceElementsBound) {
        bounds.push(surfaceElementsBound);
      }
    }

    const [pt, pr, pb, pl] = padding;
    const { viewport } = this;
    let { centerX, centerY, zoom } = viewport;

    if (bounds.length) {
      const { width, height } = viewport;
      const bound = getCommonBound(bounds);
      if (bound) {
        zoom = Math.min(
          (width - FIT_TO_SCREEN_PADDING - (pr + pl)) / bound.w,
          (height - FIT_TO_SCREEN_PADDING - (pt + pb)) / bound.h
        );
        zoom = clamp(zoom, ZOOM_MIN, ZOOM_INITIAL);

        centerX = bound.x + (bound.w + pr / zoom) / 2 - pl / zoom / 2;
        centerY = bound.y + (bound.h + pb / zoom) / 2 - pt / zoom / 2;
      } else {
        zoom = ZOOM_INITIAL;
      }
    } else {
      zoom = ZOOM_INITIAL;
    }
    return { zoom, centerX, centerY };
  }

  override mounted() {
    super.mounted();
    this._initSlotEffects();
    this._initReadonlyListener();
  }

  pickElement(
    x: number,
    y: number,
    options: { all: true } & PointTestOptions
  ): BlockSuite.EdgelessModel[];
  pickElement(
    x: number,
    y: number,
    options?: { all?: false } & PointTestOptions
  ): BlockSuite.EdgelessModel | null;
  pickElement(
    x: number,
    y: number,
    options: PointTestOptions & {
      all?: boolean;
    } = { all: false, hitThreshold: 10 }
  ): BlockSuite.EdgelessModel[] | BlockSuite.EdgelessModel | null {
    options.zoom = this._viewport.zoom;
    options.hitThreshold ??= 10;

    const hitThreshold = options.hitThreshold;
    const responsePadding = options.responsePadding ?? [
      hitThreshold / 2,
      hitThreshold / 2,
    ];
    const all = options.all ?? false;
    const hitTestBound = {
      x: x - responsePadding[1],
      y: y - responsePadding[0],
      w: responsePadding[1] * 2,
      h: responsePadding[0] * 2,
    };
    const pickCanvasElement = () => {
      const candidates = this._layer.canvasGrid.search(hitTestBound);
      const picked = candidates.filter(
        element =>
          element.includesPoint(x, y, options as PointTestOptions, this.host) ||
          element.externalBound?.isPointInBound([x, y])
      );

      return picked as BlockSuite.EdgelessModel[];
    };
    const pickBlock = () => {
      const candidates = this._layer.blocksGrid.search(hitTestBound);
      const picked = candidates.filter(
        element =>
          element.includesPoint(x, y, options as PointTestOptions, this.host) ||
          element.externalBound?.isPointInBound([x, y])
      );
      return picked as BlockSuite.EdgelessModel[];
    };
    const pickFrames = () => {
      return this._layer.frames.filter(
        frame =>
          frame.includesPoint(x, y, options as PointTestOptions) ||
          frame.externalBound?.isPointInBound([x, y])
      ) as BlockSuite.EdgelessModel[];
    };

    const frames = pickFrames();

    if (frames.length === 0 || all) {
      let results = pickCanvasElement().concat(pickBlock());

      // FIXME: optimazation on ordered element
      results.sort(this._layer.compare);

      results = results.concat(frames);

      // prettier-ignore
      return options.all ? results : (last(results) ?? null);
    } else {
      return last(frames) ?? null;
    }
  }

  /**
   * This method is used to pick element in group, if the picked element is in a
   * group, we will pick the group instead. If that picked group is currently selected, then
   * we will pick the element itself.
   */
  pickElementInGroup(
    x: number,
    y: number,
    options?: PointTestOptions
  ): BlockSuite.EdgelessModel | null {
    const selectionManager = this._selection;
    const results = this.pickElement(x, y, {
      ...options,
      all: true,
    }) as BlockSuite.EdgelessModel[];

    let picked = last(results) ?? null;
    const { activeGroup } = selectionManager;
    const first = picked;

    if (activeGroup && picked && activeGroup.hasDescendant(picked.id)) {
      let index = results.length - 1;

      while (
        picked === activeGroup ||
        (picked instanceof SurfaceGroupLikeModel &&
          picked.hasDescendant(activeGroup))
      ) {
        picked = results[--index];
      }
    } else if (picked) {
      let index = results.length - 1;

      while (picked.group !== null) {
        if (--index < 0) {
          picked = null;
          break;
        }
        picked = results[index];
      }
    }

    return (picked ?? first) as BlockSuite.EdgelessModel | null;
  }

  /**
   * Pick the elements in the given area
   * @param bound
   * @param type By default, it will pick all elements, but you can specify the type to pick only you need.
   */
  pickElementsByBound(
    bound: IBound | Bound,
    type?: 'all'
  ): BlockSuite.EdgelessModel[];

  pickElementsByBound(
    bound: IBound | Bound,
    type: 'blocks' | 'frame'
  ): GfxBlockModel[];

  pickElementsByBound(
    bound: IBound | Bound,
    type: 'canvas'
  ): BlockSuite.SurfaceElementModel[];

  pickElementsByBound(
    bound: IBound | Bound,
    type: 'frame' | 'blocks' | 'canvas' | 'all' = 'all'
  ): BlockSuite.EdgelessModel[] {
    bound = new Bound(bound.x, bound.y, bound.w, bound.h);

    const pickCanvasElement = () => {
      const candidates = this._layer.canvasGrid.search(bound);
      const picked = candidates.filter(element =>
        element.intersectsBound(bound as Bound)
      );
      return picked as BlockSuite.EdgelessModel[];
    };
    const pickBlock = () => {
      const candidates = this._layer.blocksGrid.search(bound);
      const picked = candidates.filter(element =>
        element.intersectsBound(bound as Bound)
      );
      return picked as BlockSuite.EdgelessModel[];
    };
    const pickFrames = () => {
      const candidates = this._layer.framesGrid.search(bound);
      return candidates.filter(frame =>
        frame.intersectsBound(bound as Bound)
      ) as BlockSuite.EdgelessModel[];
    };

    switch (type) {
      case 'canvas':
        return pickCanvasElement();
      case 'blocks':
        return pickBlock().concat(pickFrames());
      case 'frame':
        return pickFrames();
      case 'all': {
        const results = pickCanvasElement().concat(pickBlock());
        results.sort(this._layer.compare);
        return results.concat(pickFrames());
      }
    }
  }

  registerTool(Tool: EdgelessToolConstructor) {
    return this.tool.register(Tool);
  }

  removeElement(id: string | BlockSuite.EdgelessModel) {
    id = typeof id === 'string' ? id : id.id;

    const el = this.getElementById(id);
    if (el instanceof GfxBlockModel) {
      this.doc.deleteBlock(el);
      return;
    }

    if (this._surface.hasElementById(id)) {
      this._surface.removeElement(id);
      return;
    }
  }

  reorderElement(
    element: BlockSuite.EdgelessModel,
    direction: ReorderingDirection
  ) {
    const index = this._layer.getReorderedIndex(element, direction);

    // block should be updated in transaction
    if (element instanceof GfxBlockModel) {
      this.doc.transact(() => {
        element.index = index;
      });
    } else {
      element.index = index;
    }
  }

  setZoomByAction(action: ZoomAction) {
    if (this.locked) return;

    switch (action) {
      case 'fit':
        this.zoomToFit();
        break;
      case 'reset':
        this.viewport.smoothZoom(1.0);
        break;
      case 'in':
      case 'out':
        this.setZoomByStep(ZOOM_STEP * (action === 'in' ? 1 : -1));
    }
  }

  setZoomByStep(step: number) {
    this.viewport.smoothZoom(clamp(this.zoom + step, ZOOM_MIN, ZOOM_MAX));
  }

  ungroup(group: GroupElementModel) {
    const { selection } = this;
    const elements = group.childElements;
    const parent = group.group as GroupElementModel;

    if (group instanceof MindmapElementModel) {
      return;
    }

    if (parent !== null) {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      parent.removeChild(group.id);
    }

    elements.forEach(element => {
      // eslint-disable-next-line unicorn/prefer-dom-node-remove
      group.removeChild(element.id);
    });

    elements.forEach(element => {
      // @ts-ignore
      const elementType = element.type || element.flavour;

      element.index = this.generateIndex(elementType);
    });

    if (parent !== null) {
      elements.forEach(element => {
        parent.addChild(element.id);
      });
    }

    selection.set({
      editing: false,
      elements: elements.map(ele => ele.id),
    });
  }

  override unmounted() {
    super.unmounted();

    this._layer?.dispose();
    this._selection?.dispose();
    this.viewport?.dispose();
    this.tool?.dispose();
    this._frame?.dispose();
    this.selectionManager.set([]);
    this.disposables.dispose();
  }

  updateElement(id: string, props: Record<string, unknown>) {
    const element = this._surface.getElementById(id);
    if (element) {
      this.editPropsStore.recordLastProps(
        element.type as BlockSuite.EdgelessModelKeys,
        props
      );
      this._surface.updateElement(id, props);
      return;
    }

    const block = this.doc.getBlockById(id);
    if (block) {
      this.editPropsStore.recordLastProps(
        block.flavour as BlockSuite.EdgelessModelKeys,
        props
      );
      this.doc.updateBlock(block, props);
    }
  }

  zoomToFit() {
    const { centerX, centerY, zoom } = this.getFitToScreenData();
    this.viewport.setViewport(zoom, [centerX, centerY], true);
  }

  get blocks() {
    return (this.frames as GfxBlockModel[]).concat(this._layer.blocks);
  }

  /**
   * sorted edgeless elements
   */
  get edgelessElements() {
    return [
      ...this._layer.canvasElements,
      ...this._layer.blocks,
      ...this._layer.frames,
    ].sort(compare);
  }

  /**
   * sorted canvas elements
   */
  get elements() {
    return this._layer.canvasElements;
  }

  get frame() {
    return this._frame;
  }

  get frames() {
    return this._layer.frames;
  }

  override get host() {
    return this.std.host;
  }

  get layer() {
    return this._layer;
  }

  get locked() {
    return this.viewport.locked;
  }

  set locked(locked: boolean) {
    this.viewport.locked = locked;
  }

  get selection() {
    return this._selection;
  }

  get snap() {
    return this._snap;
  }

  get surface() {
    return this._surface;
  }

  get tool() {
    return this._tool;
  }

  get viewport() {
    return this._viewport;
  }

  get zoom() {
    return this.viewport.zoom;
  }
}
