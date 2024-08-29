import { SurfaceRefBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { SurfaceRefBlockService } from './surface-ref-service.js';

export const PageSurfaceRefBlockSpec: BlockSpec = {
  schema: SurfaceRefBlockSchema,
  view: {
    component: literal`affine-surface-ref`,
    widgets: {
      surfaceToolbar: literal`affine-surface-ref-toolbar`,
    },
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:surface-ref'), () => ({
      flavour: 'affine:surface-ref',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:surface-ref'),
      SurfaceRefBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:surface-ref')]
    );
  },
};

export const EdgelessSurfaceRefBlockSpec: BlockSpec = {
  schema: SurfaceRefBlockSchema,
  view: {
    component: literal`affine-edgeless-surface-ref`,
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:surface-ref'), () => ({
      flavour: 'affine:surface-ref',
    }));

    di.addImpl(
      BlockServiceIdentifier('affine:surface-ref'),
      SurfaceRefBlockService,
      [BlockStdScope, BlockFlavourIdentifier('affine:surface-ref')]
    );
  },
};
