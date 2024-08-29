import type { BlockSchema } from '@blocksuite/store';
import type { z } from 'zod';

import { RootBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { SurfaceBlockSchema } from '../surface-model.js';
import { MindmapService } from './service.js';

export const MiniMindmapSpecs: BlockSpec[] = [
  {
    schema: RootBlockSchema,
    view: {
      component: literal`mini-mindmap-root-block`,
    },
    setup: di => {
      di.addImpl(BlockFlavourIdentifier('affine:page'), () => ({
        flavour: 'affine:page',
      }));
      di.addImpl(BlockServiceIdentifier('affine:page'), MindmapService, [
        BlockStdScope,
        BlockFlavourIdentifier('affine:page'),
      ]);
    },
  },
  {
    schema: SurfaceBlockSchema,
    view: {
      component: literal`mini-mindmap-surface-block`,
    },
    setup: di => {
      di.addImpl(BlockFlavourIdentifier('affine:surface'), () => ({
        flavour: 'affine:surface',
      }));
    },
  },
];

export const MiniMindmapSchema: z.infer<typeof BlockSchema>[] = [
  RootBlockSchema,
  SurfaceBlockSchema,
];
