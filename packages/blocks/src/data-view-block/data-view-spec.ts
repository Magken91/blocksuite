import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { DataViewBlockSchema } from './data-view-model.js';
import { DataViewBlockService } from './database-service.js';

export const DataViewBlockSpec: BlockSpec = {
  schema: DataViewBlockSchema,
  view: {
    component: literal`affine-data-view`,
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:data-view'), () => ({
      flavour: 'affine:data-view',
    }));
    di.addImpl(
      BlockServiceIdentifier('affine:data-view'),
      DataViewBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:data-view')]
    );
  },
};
