import { EmbedGithubBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import './embed-edgeless-github-block.js';
import { EmbedGithubBlockService } from './embed-github-service.js';

export const EmbedGithubBlockSpec: BlockSpec = {
  schema: EmbedGithubBlockSchema,
  view: {
    component: model => {
      return model.parent?.flavour === 'affine:surface'
        ? literal`affine-embed-edgeless-github-block`
        : literal`affine-embed-github-block`;
    },
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:embed-github'), () => ({
      flavour: 'affine:embed-github',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:embed-github'),
      EmbedGithubBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:embed-github')]
    );
  },
};
