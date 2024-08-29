import { literal } from 'lit/static-html.js';

import type { BlockSpec } from '../spec/type.js';

import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  BlockStdScope,
} from '../scope/index.js';
import { BlockService } from '../service/index.js';
import './test-block.js';
import {
  type HeadingBlockModel,
  HeadingBlockSchema,
  NoteBlockSchema,
  RootBlockSchema,
} from './test-schema.js';

export const testSpecs: BlockSpec[] = [
  {
    schema: RootBlockSchema,
    view: {
      component: literal`test-root-block`,
    },
    setup: di => {
      di.addImpl(BlockFlavourIdentifier('test:page'), () => ({
        flavour: 'test:page',
      }));
      di.addImpl(BlockServiceIdentifier('test:page'), BlockService, [
        BlockStdScope,
        BlockFlavourIdentifier('test:page'),
      ]);
    },
  },

  {
    schema: NoteBlockSchema,
    view: {
      component: literal`test-note-block`,
    },
    setup: di => {
      di.addImpl(BlockFlavourIdentifier('test:note'), () => ({
        flavour: 'test:note',
      }));
      di.addImpl(BlockServiceIdentifier('test:note'), BlockService, [
        BlockStdScope,
        BlockFlavourIdentifier('test:note'),
      ]);
    },
  },

  {
    schema: HeadingBlockSchema,
    view: {
      component: model => {
        const h = (model as HeadingBlockModel).type$.value;

        if (h === 'h1') {
          return literal`test-h1-block`;
        }

        return literal`test-h2-block`;
      },
    },
    setup: di => {
      di.addImpl(BlockFlavourIdentifier('test:heading'), () => ({
        flavour: 'test:heading',
      }));
      di.addImpl(BlockServiceIdentifier('test:heading'), BlockService, [
        BlockStdScope,
        BlockFlavourIdentifier('test:heading'),
      ]);
    },
  },
];
