import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { commands } from './commands/index.js';
import './surface-block-void.js';
import { SurfaceBlockSchema } from './surface-model.js';
import { SurfaceBlockService } from './surface-service.js';

export const PageSurfaceBlockSpec: BlockSpec = {
  schema: SurfaceBlockSchema,
  view: {
    component: literal`affine-surface-void`,
  },
  commands,
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:surface'), () => ({
      flavour: 'affine:surface',
    }));
    di.addImpl(BlockServiceIdentifier('affine:surface'), SurfaceBlockService, [
      BlockStdScope,
      BlockFlavourIdentifier('affine:surface'),
    ]);
  },
};

export const EdgelessSurfaceBlockSpec: BlockSpec = {
  schema: SurfaceBlockSchema,
  view: {
    component: literal`affine-surface`,
  },
  commands,
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:surface'), () => ({
      flavour: 'affine:surface',
    }));
    di.addImpl(BlockServiceIdentifier('affine:surface'), SurfaceBlockService, [
      BlockStdScope,
      BlockFlavourIdentifier('affine:surface'),
    ]);
  },
};
