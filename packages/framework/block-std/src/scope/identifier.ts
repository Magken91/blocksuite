import { createIdentifier } from '@blocksuite/global/di';

import type { BlockServiceWatcher } from '../service/index.js';
import type { BlockService } from '../service/index.js';

export const BlockServiceIdentifier =
  createIdentifier<BlockService>('BlockService');

export const BlockFlavourIdentifier = createIdentifier<{ flavour: string }>(
  'BlockFlavour'
);

export const BlockServiceWatcherIdentifier =
  createIdentifier<BlockServiceWatcher>('BlockServiceWatcher');
