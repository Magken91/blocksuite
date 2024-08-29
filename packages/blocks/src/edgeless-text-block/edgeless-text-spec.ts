import { EdgelessTextBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { commands } from './commands/index.js';
import { EdgelessTextBlockService } from './edgeless-text-service.js';

export const EdgelessTextBlockSpec: BlockSpec = {
  schema: EdgelessTextBlockSchema,
  view: {
    component: literal`affine-edgeless-text`,
  },
  commands,
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:edgeless-text'), () => ({
      flavour: 'affine:edgeless-text',
    }));
    di.addImpl(
      BlockServiceIdentifier('affine:edgeless-text'),
      EdgelessTextBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:edgeless-text')]
    );
  },
};
