import type { FrameBlockModel } from '@blocksuite/affine-model';
import type { NoteBlockModel } from '@blocksuite/affine-model';
import type { Doc } from '@blocksuite/store';

import { BlockSuiteError, ErrorCode } from '@blocksuite/global/exceptions';
import { Bound, DisposableGroup, type IVec } from '@blocksuite/global/utils';
import { Boxed, DocCollection } from '@blocksuite/store';

import type { EdgelessRootService } from '../../index.js';
import type { SurfaceBlockModel } from '../../surface-block/surface-model.js';

import { Overlay, type RoughCanvas } from '../../surface-block/index.js';
import { GfxBlockModel } from './block-model.js';
import { edgelessElementsBound } from './utils/bound-utils.js';
import { isFrameBlock } from './utils/query.js';

const MIN_FRAME_WIDTH = 800;
const MIN_FRAME_HEIGHT = 640;
const FRAME_PADDING = 40;

export class FrameOverlay extends Overlay {
  bound: Bound | null = null;

  clear() {
    this.bound = null;
    this._renderer?.refresh();
  }

  highlight(frame: FrameBlockModel) {
    const bound = Bound.deserialize(frame.xywh);

    this.bound = bound;
    this._renderer?.refresh();
  }

  override render(ctx: CanvasRenderingContext2D, _rc: RoughCanvas): void {
    if (!this.bound) return;
    const { x, y, w, h } = this.bound;
    ctx.beginPath();
    ctx.strokeStyle = '#1E96EB';
    ctx.lineWidth = 2;
    ctx.roundRect(x, y, w, h, 8);
    ctx.stroke();
  }
}

export class EdgelessFrameManager {
  private _disposable = new DisposableGroup();

  constructor(private _rootService: EdgelessRootService) {
    this._watchElementDeleted();
  }

  private _watchElementDeleted() {
    this._disposable.add(
      this._rootService.surface.elementRemoved.on(({ model }) => {
        this.removeParentFrame(model);
      })
    );

    this._disposable.add(
      this._rootService.doc.slots.blockUpdated.on(payload => {
        if (payload.type === 'delete') {
          const element = this._rootService.getElementById(payload.model.id);
          if (element) this.removeParentFrame(element);
        }
      })
    );
  }

  /**
   * Reset parent of elements to the frame
   */
  addElementsToFrame(
    frame: FrameBlockModel,
    elements: BlockSuite.EdgelessModel[]
  ) {
    if (frame.childElementIds === undefined) {
      elements = [...elements, ...this.getChildElementsInFrame(frame)];
      frame.childElementIds = new Boxed(new DocCollection.Y.Map());
    }

    elements = elements.filter(
      ({ id }) => id !== frame.id && !frame.childElementIds?.getValue()?.has(id)
    );

    this._rootService.doc.transact(() => {
      elements.forEach(element => {
        const parentFrame = this.getParentFrame(element);
        if (parentFrame) {
          parentFrame.childElementIds?.getValue()?.delete(element.id);
        }
        frame.childElementIds?.getValue()?.set(element.id, true);
      });
    });
  }

  createFrameOnSelected() {
    const surfaceModel =
      this._rootService.doc.getBlockByFlavour('affine:surface')[0];

    let bound = edgelessElementsBound(
      this._rootService.selection.selectedElements
    );
    bound = bound.expand(FRAME_PADDING);
    if (bound.w < MIN_FRAME_WIDTH) {
      const offset = (MIN_FRAME_WIDTH - bound.w) / 2;
      bound = bound.expand(offset, 0);
    }
    if (bound.h < MIN_FRAME_HEIGHT) {
      const offset = (MIN_FRAME_HEIGHT - bound.h) / 2;
      bound = bound.expand(0, offset);
    }
    const id = this._rootService.addBlock(
      'affine:frame',
      {
        title: new DocCollection.Y.Text(`Frame ${this.frames.length + 1}`),
        xywh: bound.serialize(),
      },
      surfaceModel
    );
    const frameModel = this._rootService.getElementById(id);

    if (!frameModel || !isFrameBlock(frameModel)) {
      throw new BlockSuiteError(
        ErrorCode.GfxBlockElementError,
        'Frame model is not found'
      );
    }

    this.addElementsToFrame(
      frameModel,
      this.getElementsInFrameBound(frameModel)
    );

    this._rootService.doc.captureSync();

    this._rootService.selection.set({
      elements: [frameModel.id],
      editing: false,
    });

    return this._rootService.getElementById(id);
  }

  dispose() {
    this._disposable.dispose();
  }

  /**
   * Get all elements in the frame, there are three cases:
   * 1. The frame doesn't have `childElements`, return all elements in the frame bound but not owned by another frame.
   * 2. Return all child elements of the frame if `childElements` exists.
   */
  getChildElementsInFrame(frame: FrameBlockModel): BlockSuite.EdgelessModel[] {
    if (frame.childElementIds === undefined) {
      return this.getElementsInFrameBound(frame).filter(
        element => this.getParentFrame(element) !== null
      );
    }

    const childElementIds = [
      ...(frame.childElementIds.getValue()?.keys() ?? []),
    ];

    const childElements = childElementIds
      .map(id => this._rootService.getElementById(id))
      .filter(element => element !== null);

    return childElements;
  }

  /**
   * Get all elements in the frame bound,
   * whatever the element already has another parent frame or not.
   */
  getElementsInFrameBound(frame: FrameBlockModel, fullyContained = true) {
    const bound = Bound.deserialize(frame.xywh);
    const elements: BlockSuite.EdgelessModel[] =
      this._rootService.layer.canvasGrid.search(bound, true);

    return elements.concat(
      getBlocksInFrameBound(this._rootService.doc, frame, fullyContained)
    );
  }

  /**
   * Get most top frame from the point.
   */
  getFrameFromPoint([x, y]: IVec, ignoreFrames: FrameBlockModel[] = []) {
    for (let i = this.frames.length - 1; i >= 0; i--) {
      const frame = this.frames[i];
      if (frame.includesPoint(x, y, {}) && !ignoreFrames.includes(frame)) {
        return frame;
      }
    }
    return null;
  }

  getParentFrame(element: BlockSuite.EdgelessModel) {
    return (
      this.frames.find(frame => {
        return frame.childElementIds?.getValue()?.has(element.id);
      }) ?? null
    );
  }

  removeAllChildrenFromFrame(frame: FrameBlockModel) {
    this._rootService.doc.transact(() => {
      frame.childElementIds?.getValue()?.clear();
    });
  }

  removeParentFrame(element: BlockSuite.EdgelessModel) {
    this._rootService.doc.transact(() => {
      const parentFrame = this.getParentFrame(element);
      if (parentFrame) {
        parentFrame.childElementIds?.getValue()?.delete(element.id);
      }
    });
  }

  /**
   * Get all sorted frames
   */
  get frames() {
    return this._rootService.frames;
  }
}

export function getNotesInFrameBound(
  doc: Doc,
  frame: FrameBlockModel,
  fullyContained: boolean = true
) {
  const bound = Bound.deserialize(frame.xywh);

  return (doc.getBlockByFlavour('affine:note') as NoteBlockModel[]).filter(
    ele => {
      const xywh = Bound.deserialize(ele.xywh);

      return fullyContained
        ? bound.contains(xywh)
        : bound.isPointInBound([xywh.x, xywh.y]);
    }
  ) as NoteBlockModel[];
}

export function getBlocksInFrameBound(
  doc: Doc,
  model: FrameBlockModel,
  fullyContained: boolean = true
) {
  const bound = Bound.deserialize(model.xywh);
  const surfaceModel = doc.getBlockByFlavour([
    'affine:surface',
  ]) as SurfaceBlockModel[];

  return (
    getNotesInFrameBound(
      doc,
      model,
      fullyContained
    ) as BlockSuite.EdgelessBlockModelType[]
  ).concat(
    surfaceModel[0].children.filter(ele => {
      if (ele.id === model.id) return;
      if (ele instanceof GfxBlockModel) {
        const blockBound = Bound.deserialize(ele.xywh);
        return fullyContained
          ? bound.contains(blockBound)
          : bound.containsPoint([blockBound.x, blockBound.y]);
      }

      return false;
    }) as BlockSuite.EdgelessBlockModelType[]
  );
}
