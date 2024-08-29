import type { CodeBlockComponent } from '../../../code-block/code-block.js';

import { MenuContext } from '../../configs/toolbar.js';

export class CodeBlockToolbarContext extends MenuContext {
  override close = () => {
    this.abortController.abort();
  };

  constructor(
    public blockComponent: CodeBlockComponent,
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
