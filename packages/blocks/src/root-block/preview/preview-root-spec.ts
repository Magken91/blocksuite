import { RootBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { PageRootService } from '../page/page-root-service.js';

export const PreviewPageSpec: BlockSpec = {
  schema: RootBlockSchema,
  view: {
    component: literal`affine-preview-root`,
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:page'), () => ({
      flavour: 'affine:page',
    }));
    di.addImpl(BlockServiceIdentifier('affine:page'), PageRootService, [
      BlockStdScope,
      BlockFlavourIdentifier('affine:page'),
    ]);
  },
};
