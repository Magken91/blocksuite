import { DividerBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { DividerBlockService } from './divider-service.js';

export const DividerBlockSpec: BlockSpec = {
  schema: DividerBlockSchema,
  view: {
    component: literal`affine-divider`,
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:divider'), () => ({
      flavour: 'affine:divider',
    }));
    di.addImpl(BlockServiceIdentifier('affine:divider'), DividerBlockService, [
      BlockStdScope,
      BlockFlavourIdentifier('affine:divider'),
    ]);
  },
};
