import { EmbedHtmlBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import './embed-edgeless-html-block.js';
import { EmbedHtmlBlockService } from './embed-html-service.js';

export const EmbedHtmlBlockSpec: BlockSpec = {
  schema: EmbedHtmlBlockSchema,
  view: {
    component: model => {
      return model.parent?.flavour === 'affine:surface'
        ? literal`affine-embed-edgeless-html-block`
        : literal`affine-embed-html-block`;
    },
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:embed-html'), () => ({
      flavour: 'affine:embed-html',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:embed-html'),
      EmbedHtmlBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:embed-html')]
    );
  },
};
