import type { FrameBlockModel } from '@blocksuite/affine-model';

import {
  type EditorHost,
  ShadowlessElement,
  WithDisposable,
} from '@blocksuite/block-std';
import { DisposableGroup, deserializeXYWH } from '@blocksuite/global/utils';
import { Bound } from '@blocksuite/global/utils';
import { BlockViewType, type Doc, type Query } from '@blocksuite/store';
import { css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { EdgelessRootBlockComponent } from '../../edgeless-root-block.js';
import type { EdgelessRootPreviewBlockComponent } from '../../edgeless-root-preview-block.js';
import type { EdgelessRootService } from '../../edgeless-root-service.js';

import { SpecProvider } from '../../../../_specs/index.js';
import '../../../../surface-ref-block/surface-ref-portal.js';

const DEFAULT_PREVIEW_CONTAINER_WIDTH = 280;
const DEFAULT_PREVIEW_CONTAINER_HEIGHT = 166;

const styles = css`
  .frame-preview-container {
    display: block;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }

  .frame-preview-surface-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
  }

  .frame-preview-viewport {
    max-width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    pointer-events: none;
    user-select: none;

    .edgeless-background {
      background-color: transparent;
      background-image: none;
    }
  }
`;

@customElement('frame-preview')
export class FramePreview extends WithDisposable(ShadowlessElement) {
  private _clearFrameDisposables = () => {
    this._frameDisposables?.dispose();
    this._frameDisposables = null;
  };

  private _docFilter: Query = {
    mode: 'loose',
    match: [
      {
        flavour: 'affine:frame',
        viewType: BlockViewType.Hidden,
      },
    ],
  };

  private _frameDisposables: DisposableGroup | null = null;

  private _getViewportWH = () => {
    const [, , w, h] = deserializeXYWH(this.frame.xywh);

    let scale = 1;
    if (this.fillScreen) {
      scale = Math.max(this.surfaceWidth / w, this.surfaceHeight / h);
    } else {
      scale = Math.min(this.surfaceWidth / w, this.surfaceHeight / h);
    }

    return {
      width: w * scale,
      height: h * scale,
    };
  };

  private _previewDoc: Doc | null = null;

  private _previewSpec = SpecProvider.getInstance().getSpec('edgeless:preview');

  static override styles = styles;

  private _initPreviewDoc() {
    this._previewDoc = this.doc.collection.getDoc(this.doc.id, {
      query: this._docFilter,
      readonly: true,
    });
    this.disposables.add(() => {
      this.doc.blockCollection.clearQuery(this._docFilter);
    });
  }

  private _initSpec() {
    this._previewSpec.setup('affine:page', ({ viewConnected }) => {
      viewConnected.on(({ component }) => {
        const edgelessBlock = component as EdgelessRootPreviewBlockComponent;

        edgelessBlock.editorViewportSelector = 'frame-preview-viewport';
        edgelessBlock.service.viewport.sizeUpdated.once(() => {
          this._refreshViewport();
        });
      });
    });
  }

  private _refreshViewport() {
    const previewEditorHost = this.previewEditor;

    if (!previewEditorHost) return;

    const edgelessService = previewEditorHost.spec.getService(
      'affine:page'
    ) as EdgelessRootService;

    const frameBound = Bound.deserialize(this.frame.xywh);
    edgelessService.viewport.setViewportByBound(frameBound);
  }

  private _renderSurfaceContent() {
    if (!this._previewDoc || !this.frame) return nothing;
    const { width, height } = this._getViewportWH();

    const _previewSpec = this._previewSpec.value;
    return html`<div
      class="frame-preview-surface-container"
      style=${styleMap({
        width: `${this.surfaceWidth}px`,
        height: `${this.surfaceHeight}px`,
      })}
    >
      <div
        class="frame-preview-viewport"
        style=${styleMap({
          width: `${width}px`,
          height: `${height}px`,
        })}
      >
        ${this.host.renderSpecPortal(this._previewDoc, _previewSpec)}
      </div>
    </div>`;
  }

  private _setFrameDisposables(frame: FrameBlockModel) {
    this._clearFrameDisposables();
    this._frameDisposables = new DisposableGroup();
    this._frameDisposables.add(
      frame.propsUpdated.on(() => {
        this._refreshViewport();
      })
    );
  }

  override connectedCallback() {
    super.connectedCallback();
    this._initSpec();
    this._initPreviewDoc();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._clearFrameDisposables();
  }

  override firstUpdated() {
    this._refreshViewport();
    this._setFrameDisposables(this.frame);
  }

  override render() {
    const { frame, host } = this;
    const noContent = !frame || !frame.xywh || !host;

    return html`<div class="frame-preview-container">
      ${noContent ? nothing : this._renderSurfaceContent()}
    </div>`;
  }

  override willUpdate(_changedProperties: Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('frame')) {
      this._refreshViewport();
    }
  }

  @property({ attribute: false })
  accessor doc!: Doc;

  @property({ attribute: false })
  accessor edgeless: EdgelessRootBlockComponent | null = null;

  @state()
  accessor fillScreen = false;

  @property({ attribute: false })
  accessor frame!: FrameBlockModel;

  @property({ attribute: false })
  accessor host!: EditorHost;

  @query('editor-host')
  accessor previewEditor: EditorHost | null = null;

  @property({ attribute: false })
  accessor surfaceHeight: number = DEFAULT_PREVIEW_CONTAINER_HEIGHT;

  @property({ attribute: false })
  accessor surfaceWidth: number = DEFAULT_PREVIEW_CONTAINER_WIDTH;
}

declare global {
  interface HTMLElementTagNameMap {
    'frame-preview': FramePreview;
  }
}
