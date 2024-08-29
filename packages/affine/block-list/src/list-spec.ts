import { ListBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { commands } from './commands/index.js';
import { ListBlockService } from './list-service.js';

export const ListBlockSpec: BlockSpec = {
  schema: ListBlockSchema,
  view: {
    component: literal`affine-list`,
  },
  commands,
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:list'), () => ({
      flavour: 'affine:list',
    }));
    di.addImpl(BlockServiceIdentifier('affine:list'), ListBlockService, [
      BlockStdScope,
      BlockFlavourIdentifier('affine:list'),
    ]);
  },
};
