import type { ImageBlockComponent } from '../../../image-block/image-block.js';

import { MenuContext } from '../../configs/toolbar.js';

export class ImageToolbarContext extends MenuContext {
  constructor(
    public blockComponent: ImageBlockComponent,
    public abortController: AbortController
  ) {
    super();
  }

  isEmpty() {
    return false;
  }

  isMultiple() {
    return false;
  }

  isSingle() {
    return true;
  }

  get doc() {
    return this.blockComponent.doc;
  }

  get host() {
    return this.blockComponent.host;
  }

  get selectedBlockModels() {
    return [this.blockComponent.model];
  }

  get std() {
    return this.blockComponent.std;
  }
}
