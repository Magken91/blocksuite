import { EmbedYoutubeBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import './embed-edgeless-youtube-block.js';
import { EmbedYoutubeBlockService } from './embed-youtube-service.js';

export const EmbedYoutubeBlockSpec: BlockSpec = {
  schema: EmbedYoutubeBlockSchema,
  view: {
    component: model => {
      return model.parent?.flavour === 'affine:surface'
        ? literal`affine-embed-edgeless-youtube-block`
        : literal`affine-embed-youtube-block`;
    },
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:embed-youtube'), () => ({
      flavour: 'affine:embed-youtube',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:embed-youtube'),
      EmbedYoutubeBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:embed-youtube')]
    );
  },
};
