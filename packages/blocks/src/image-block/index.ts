// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./cropperjs.d.ts" />

import type { ImageBlockService } from './image-service.js';

export * from './image-block.js';
export * from './image-edgeless-block.js';
export * from './image-service.js';
export { ImageSelection } from '@blocksuite/affine-shared/selection';

declare global {
  namespace BlockSuite {
    interface BlockServices {
      'affine:image': ImageBlockService;
    }
  }
}
