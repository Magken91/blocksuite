import { ParagraphBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { commands } from './commands/index.js';
import { ParagraphBlockService } from './paragraph-service.js';

export const ParagraphBlockSpec: BlockSpec = {
  schema: ParagraphBlockSchema,
  view: {
    component: literal`affine-paragraph`,
  },
  commands,
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:paragraph'), () => ({
      flavour: 'affine:paragraph',
    }));
    di.addImpl(
      BlockServiceIdentifier('affine:paragraph'),
      ParagraphBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:paragraph')]
    );
  },
};
