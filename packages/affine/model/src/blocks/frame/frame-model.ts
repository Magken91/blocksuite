import type { GfxBlockElementModel } from '@blocksuite/block-std/gfx';

import {
  type GfxContainerElement,
  type GfxElementGeometry,
  type PointTestOptions,
  SurfaceBlockModel,
  gfxContainerSymbol,
} from '@blocksuite/block-std/gfx';
import { Bound, type SerializedXYWH } from '@blocksuite/global/utils';
import {
  BlockModel,
  Boxed,
  DocCollection,
  type Text,
  type Y,
  defineBlockSchema,
} from '@blocksuite/store';

import type { Color } from '../../consts/index.js';

import { GfxCompatible } from '../../utils/index.js';

export type FrameBlockProps = {
  title: Text;
  background: Color;
  xywh: SerializedXYWH;
  index: string;
  childElementIds?: Boxed<Y.Map<boolean>>;
};

export const FrameBlockSchema = defineBlockSchema({
  flavour: 'affine:frame',
  props: (internal): FrameBlockProps => ({
    title: internal.Text(),
    background: '--affine-palette-transparent',
    xywh: `[0,0,100,100]`,
    index: 'a0',
    childElementIds: new Boxed(new DocCollection.Y.Map()),
  }),
  metadata: {
    version: 1,
    role: 'content',
    parent: ['affine:surface'],
    children: [],
  },
  toModel: () => {
    return new FrameBlockModel();
  },
});

export class FrameBlockModel
  extends GfxCompatible<FrameBlockProps>(BlockModel)
  implements GfxElementGeometry, GfxContainerElement
{
  [gfxContainerSymbol] = true as const;

  override includesPoint(x: number, y: number, _: PointTestOptions): boolean {
    const bound = Bound.deserialize(this.xywh);
    return bound.isPointInBound([x, y]);
  }

  override intersectsBound(selectedBound: Bound): boolean {
    const bound = Bound.deserialize(this.xywh);
    return (
      bound.isIntersectWithBound(selectedBound) || selectedBound.contains(bound)
    );
  }

  get childElements() {
    const surface = this.doc
      .getBlocks()
      .find(model => model instanceof SurfaceBlockModel);
    if (!surface) return [];

    const elements: BlockSuite.EdgelessModel[] = [];

    for (const key of this.childIds) {
      const element =
        surface.getElementById(key) ||
        (surface.doc.getBlockById(key) as GfxBlockElementModel);

      element && elements.push(element);
    }

    return elements;
  }

  get childIds() {
    return [...(this.childElementIds?.getValue()?.keys() ?? [])];
  }
}

declare global {
  namespace BlockSuite {
    interface EdgelessBlockModelMap {
      'affine:frame': FrameBlockModel;
    }
    interface BlockModels {
      'affine:frame': FrameBlockModel;
    }
  }
}
