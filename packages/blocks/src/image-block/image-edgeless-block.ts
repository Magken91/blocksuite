import type { BlockCaptionEditor } from '@blocksuite/affine-components/caption';
import type { ImageBlockModel } from '@blocksuite/affine-model';
import type { CropperCanvas } from 'cropperjs';
import type { CropperSelection } from 'cropperjs';

import '@blocksuite/affine-components/caption';
import { Peekable } from '@blocksuite/affine-components/peek';
import { GfxBlockComponent } from '@blocksuite/block-std';
import Cropper from 'cropperjs';
import { css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { when } from 'lit/directives/when.js';

import type { EdgelessRootService } from '../root-block/edgeless/edgeless-root-service.js';
import type {
  EdgelessElementToolbarWidget,
  EdgelessRootBlockComponent,
} from '../root-block/index.js';
import type { ImageBlockFallbackCard } from './components/image-block-fallback.js';
import type { ImageBlockService } from './image-service.js';

import { EDGELESS_ELEMENT_TOOLBAR_WIDGET } from '../root-block/widgets/element-toolbar/index.js';
import './components/image-block-fallback.js';
import {
  copyImageBlob,
  downloadImageBlob,
  fetchImageBlob,
  resetImageSize,
  turnImageIntoCardView,
} from './utils.js';

type CropperXywh = { x: number; y: number; width: number; height: number };

@customElement('affine-edgeless-image')
@Peekable()
export class ImageEdgelessBlockComponent extends GfxBlockComponent<
  EdgelessRootService,
  ImageBlockModel,
  ImageBlockService
> {
  static override styles = css`
    affine-edgeless-image .resizable-img,
    affine-edgeless-image .resizable-img img {
      width: 100%;
      height: 100%;
    }
  `;

  convertToCardView = () => {
    turnImageIntoCardView(this).catch(console.error);
  };

  copy = () => {
    copyImageBlob(this).catch(console.error);
  };

  crop = async () => {
    const imgEle = this.resizableImg.querySelector('img') as HTMLImageElement;
    if (this.cropping || !imgEle) return;
    this.cropping = true;
    const cropper = new Cropper(imgEle, {
      template:
        `<cropper-canvas background style="height: ${imgEle.height}px;">` +
        '<cropper-image></cropper-image>' +
        '<cropper-shade hidden></cropper-shade>' +
        '<cropper-handle action="select" plain></cropper-handle>' +
        '<cropper-selection initial-coverage="0.5" movable resizable>' +
        '<cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.35)"></cropper-handle>' +
        '<cropper-handle action="n-resize"></cropper-handle>' +
        '<cropper-handle action="e-resize"></cropper-handle>' +
        '<cropper-handle action="s-resize"></cropper-handle>' +
        '<cropper-handle action="w-resize"></cropper-handle>' +
        '<cropper-handle action="ne-resize"></cropper-handle>' +
        '<cropper-handle action="nw-resize"></cropper-handle>' +
        '<cropper-handle action="se-resize"></cropper-handle>' +
        '<cropper-handle action="sw-resize"></cropper-handle>' +
        '</cropper-selection>' +
        '</cropper-canvas>',
    });
    const cropperCanvas = cropper.getCropperCanvas() as CropperCanvas;
    const cropperImage = cropper.getCropperImage();
    if (!cropperImage) {
      this.cropping = false;
      return;
    }
    await cropperImage.$ready();
    const toolbar = this.std.host.view.getWidget(
      EDGELESS_ELEMENT_TOOLBAR_WIDGET,
      this.doc.root?.id ?? ''
    ) as EdgelessElementToolbarWidget | null;
    if (toolbar) toolbar.toolbarVisible = false;
    const selectedRect = (this.rootComponent as EdgelessRootBlockComponent)
      .selectedRect;
    if (selectedRect) selectedRect.style.display = 'none';
    queueMicrotask(() => {
      cropperImage.style.removeProperty('width');
      cropperImage.style.removeProperty('height');
      cropperImage.$center();
      const cropperSelection = cropper.getCropperSelection();
      if (!cropperSelection) {
        this.cropping = false;
        return;
      }
      cropperSelection.addEventListener('change', event => {
        const { detail } = event as CustomEvent;
        const maxSelection = {
          x: 0,
          y: 0,
          width: cropperCanvas.clientWidth,
          height: cropperCanvas.clientHeight,
        };
        if (!this._inSelection(detail, maxSelection)) {
          event.preventDefault();
        }
      });
    });
  };

  download = () => {
    downloadImageBlob(this).catch(console.error);
  };

  refreshData = () => {
    this.retryCount = 0;
    fetchImageBlob(this)
      .then(() => {
        const { width, height } = this.model;
        if (!width || !height) {
          return resetImageSize(this);
        }

        return;
      })
      .catch(console.error);
  };

  override rootServiceFlavour: string = 'affine:page';

  private _handleError(error: Error) {
    this.dispatchEvent(new CustomEvent('error', { detail: error }));
  }

  private _inSelection(selection: CropperSelection, maxSelection: CropperXywh) {
    return (
      selection.x >= maxSelection.x &&
      selection.y >= maxSelection.y &&
      selection.x + selection.width <= maxSelection.x + maxSelection.width &&
      selection.y + selection.height <= maxSelection.y + maxSelection.height
    );
  }

  override connectedCallback() {
    super.connectedCallback();

    this.refreshData();
    this.contentEditable = 'false';
    this.model.propsUpdated.on(({ key }) => {
      if (key === 'sourceId') {
        this.refreshData();
      }
    });
  }

  override disconnectedCallback() {
    if (this.blobUrl) {
      URL.revokeObjectURL(this.blobUrl);
    }
    super.disconnectedCallback();
  }

  override renderGfxBlock() {
    const containerStyleMap = styleMap({
      position: 'relative',
      width: '100%',
    });

    return html`
      <div class="affine-image-container" style=${containerStyleMap}>
        ${when(
          this.loading || this.error || !this.blobUrl,
          () =>
            html`<affine-image-fallback-card
              .error=${this.error}
              .loading=${this.loading}
              .mode=${'page'}
            ></affine-image-fallback-card>`,
          () =>
            html`<div class="resizable-img">
              <img
                class="drag-target"
                src=${this.blobUrl ?? ''}
                draggable="false"
                @error=${this._handleError}
              />
            </div>`
        )}
        <affine-block-selection .block=${this}></affine-block-selection>
      </div>
      <block-caption-editor></block-caption-editor>

      ${Object.values(this.widgets)}
    `;
  }

  override toZIndex() {
    return `${this.rootService.layer.getZIndex(this.model)}`;
  }

  override updated() {
    this.fallbackCard?.requestUpdate();
  }

  @property({ attribute: false })
  accessor blob: Blob | undefined = undefined;

  @property({ attribute: false })
  accessor blobUrl: string | undefined = undefined;

  @query('block-caption-editor')
  accessor captionEditor!: BlockCaptionEditor | null;

  @property({ attribute: false })
  accessor cropping = false;

  @property({ attribute: false })
  accessor downloading = false;

  @property({ attribute: false })
  accessor error = false;

  @query('affine-image-fallback-card')
  accessor fallbackCard: ImageBlockFallbackCard | null = null;

  @state()
  accessor lastSourceId!: string;

  @property({ attribute: false })
  accessor loading = false;

  @query('.resizable-img')
  accessor resizableImg!: HTMLDivElement;

  @property({ attribute: false })
  accessor retryCount = 0;
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-edgeless-image': ImageEdgelessBlockComponent;
  }
}
