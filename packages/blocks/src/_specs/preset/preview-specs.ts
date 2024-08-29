import { RootBlockSchema } from '@blocksuite/affine-model';
import {
  DocModeProvider,
  DocModeService,
} from '@blocksuite/affine-shared/services';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { PageRootService } from '../../root-block/page/page-root-service.js';
import { PageSurfaceBlockSpec } from '../../surface-block/surface-spec.js';
import { PageSurfaceRefBlockSpec } from '../../surface-ref-block/surface-ref-spec.js';
import { CommonFirstPartyBlockSpecs } from '../common.js';

const PreviewPageSpec: BlockSpec = {
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
    di.addImpl(DocModeProvider, DocModeService, [BlockStdScope]);
  },
};

export const PreviewEditorBlockSpecs: BlockSpec[] = [
  PreviewPageSpec,
  ...CommonFirstPartyBlockSpecs,
  PageSurfaceBlockSpec,
  PageSurfaceRefBlockSpec,
];
