import { BookmarkBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import './bookmark-edgeless-block.js';
import { BookmarkBlockService } from './bookmark-service.js';
import { commands } from './commands/index.js';

export const BookmarkBlockSpec: BlockSpec = {
  schema: BookmarkBlockSchema,
  view: {
    component: model =>
      model.parent?.flavour === 'affine:surface'
        ? literal`affine-edgeless-bookmark`
        : literal`affine-bookmark`,
  },
  commands,
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:bookmark'), () => ({
      flavour: 'affine:bookmark',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:bookmark'),
      BookmarkBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:bookmark')]
    );
  },
};
