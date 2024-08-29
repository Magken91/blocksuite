import { EmbedSyncedDocBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import './embed-edgeless-synced-doc-block.js';
import { EmbedSyncedDocBlockService } from './embed-synced-doc-service.js';

export const EmbedSyncedDocBlockSpec: BlockSpec = {
  schema: EmbedSyncedDocBlockSchema,
  view: {
    component: model => {
      return model.parent?.flavour === 'affine:surface'
        ? literal`affine-embed-edgeless-synced-doc-block`
        : literal`affine-embed-synced-doc-block`;
    },
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:embed-synced-doc'), () => ({
      flavour: 'affine:embed-synced-doc',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:embed-synced-doc'),
      EmbedSyncedDocBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:embed-synced-doc')]
    );
  },
};
