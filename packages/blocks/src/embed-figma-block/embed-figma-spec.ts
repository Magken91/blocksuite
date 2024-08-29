import { EmbedFigmaBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import './embed-edgeless-figma-block.js';
import { EmbedFigmaBlockService } from './embed-figma-service.js';

export const EmbedFigmaBlockSpec: BlockSpec = {
  schema: EmbedFigmaBlockSchema,
  view: {
    component: model => {
      return model.parent?.flavour === 'affine:surface'
        ? literal`affine-embed-edgeless-figma-block`
        : literal`affine-embed-figma-block`;
    },
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:embed-figma'), () => ({
      flavour: 'affine:embed-figma',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:embed-figma'),
      EmbedFigmaBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:embed-figma')]
    );
  },
};
