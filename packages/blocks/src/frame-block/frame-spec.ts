import { FrameBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { FrameBlockService } from './frame-service.js';

export const FrameBlockSpec: BlockSpec = {
  schema: FrameBlockSchema,
  view: {
    component: literal`affine-frame`,
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:frame'), () => ({
      flavour: 'affine:frame',
    }));
    di.addImpl(BlockServiceIdentifier('affine:frame'), FrameBlockService, [
      BlockStdScope,
      BlockFlavourIdentifier('affine:frame'),
    ]);
  },
};
