import { DatabaseBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { DatabaseBlockService } from './database-service.js';

export const DatabaseBlockSpec: BlockSpec = {
  schema: DatabaseBlockSchema,
  view: {
    component: literal`affine-database`,
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:database'), () => ({
      flavour: 'affine:database',
    }));
    di.addImpl(
      BlockServiceIdentifier('affine:database'),
      DatabaseBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:database')]
    );
  },
};
