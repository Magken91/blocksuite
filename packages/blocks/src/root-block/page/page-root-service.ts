import type { ReferenceInfo } from '@blocksuite/affine-model';

import { Slot } from '@blocksuite/store';

import type { Viewport } from '../../_common/utils/index.js';

import { RootService } from '../root-service.js';

export class PageRootService extends RootService {
  slots = {
    docLinkClicked: new Slot<ReferenceInfo>(),
    tagClicked: new Slot<{ tagId: string }>(),
    viewportUpdated: new Slot<Viewport>(),
  };
}
