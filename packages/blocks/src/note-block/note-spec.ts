import { NoteBlockSchema } from '@blocksuite/affine-model';
import {
  BlockFlavourIdentifier,
  BlockServiceIdentifier,
  type BlockSpec,
  BlockStdScope,
} from '@blocksuite/block-std';
import { literal } from 'lit/static-html.js';

import { commands } from './commands/index.js';
import { NoteBlockService } from './note-service.js';

export const NoteBlockSpec: BlockSpec = {
  schema: NoteBlockSchema,
  view: {
    component: literal`affine-note`,
  },
  commands,
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:note'), () => ({
      flavour: 'affine:note',
    }));
    di.addImpl(BlockServiceIdentifier('affine:note'), NoteBlockService, [
      BlockStdScope,
      BlockFlavourIdentifier('affine:note'),
    ]);
  },
};

export const EdgelessNoteBlockSpec: BlockSpec = {
  schema: NoteBlockSchema,
  view: {
    component: literal`affine-edgeless-note`,
  },
  setup: di => {
    di.addImpl(BlockFlavourIdentifier('affine:note'), () => {
      return {
        flavour: 'affine:note',
      };
    });
    di.addImpl(BlockServiceIdentifier('affine:note'), NoteBlockService, [
      BlockStdScope,
      BlockFlavourIdentifier('affine:note'),
    ]);
  },
  commands,
};
