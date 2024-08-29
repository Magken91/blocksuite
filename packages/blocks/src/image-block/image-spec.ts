import { ImageBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { commands } from './commands/index.js';
import { ImageBlockService } from './image-service.js';

export const ImageBlockSpec: BlockSpec = {
  schema: ImageBlockSchema,
  view: {
    component: model => {
      const parent = model.doc.getParent(model.id);

      if (parent?.flavour === 'affine:surface') {
        return literal`affine-edgeless-image`;
      }

      return literal`affine-image`;
    },
    widgets: {
      imageToolbar: literal`affine-image-toolbar-widget`,
    },
  },
  commands,
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:image'), () => ({
      flavour: 'affine:image',
    }));
    di.addImpl(BlockServiceIdentifier('affine:image'), ImageBlockService, [
      BlockStdScope,
      BlockFlavourIdentifier('affine:image'),
    ]);
  },
};
