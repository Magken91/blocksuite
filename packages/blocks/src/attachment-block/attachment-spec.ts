import { AttachmentBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import './attachment-edgeless-block.js';
import { AttachmentBlockService } from './attachment-service.js';

export const AttachmentBlockSpec: BlockSpec = {
  schema: AttachmentBlockSchema,
  view: {
    component: model => {
      return model.doc.getParent(model)?.flavour === 'affine:surface'
        ? literal`affine-edgeless-attachment`
        : literal`affine-attachment`;
    },
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:attachment'), () => ({
      flavour: 'affine:attachment',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:attachment'),
      AttachmentBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:attachment')]
    );
  },
};
