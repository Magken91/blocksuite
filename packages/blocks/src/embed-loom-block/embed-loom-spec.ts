import { EmbedLoomBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import './embed-edgeless-loom-bock.js';
import { EmbedLoomBlockService } from './embed-loom-service.js';

export const EmbedLoomBlockSpec: BlockSpec = {
  schema: EmbedLoomBlockSchema,
  view: {
    component: model => {
      return model.parent?.flavour === 'affine:surface'
        ? literal`affine-embed-edgeless-loom-block`
        : literal`affine-embed-loom-block`;
    },
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:embed-loom'), () => ({
      flavour: 'affine:embed-loom',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:embed-loom'),
      EmbedLoomBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:embed-loom')]
    );
  },
};
