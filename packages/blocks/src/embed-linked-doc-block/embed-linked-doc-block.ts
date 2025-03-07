import type {
  EmbedLinkedDocModel,
  EmbedLinkedDocStyles,
  ReferenceInfo,
} from '@blocksuite/affine-model';

import { BlockLinkIcon } from '@blocksuite/affine-components/icons';
import { Peekable, isPeekable } from '@blocksuite/affine-components/peek';
import { REFERENCE_NODE } from '@blocksuite/affine-components/rich-text';
import { DocMode } from '@blocksuite/affine-model';
import { Bound } from '@blocksuite/global/utils';
import { assertExists } from '@blocksuite/global/utils';
import { DocCollection } from '@blocksuite/store';
import { html, nothing } from 'lit';
import { customElement, property, queryAsync, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import type { RootBlockComponent } from '../root-block/index.js';
import type { SurfaceRefBlockService } from '../surface-ref-block/index.js';
import type { SurfaceRefRenderer } from '../surface-ref-block/surface-ref-renderer.js';
import type { EmbedLinkedDocBlockConfig } from './embed-linked-doc-config.js';
import type { EmbedLinkedDocBlockService } from './embed-linked-doc-service.js';

import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH } from '../_common/consts.js';
import { EmbedBlockComponent } from '../_common/embed-block-helper/index.js';
import { renderLinkedDocInCard } from '../_common/utils/render-linked-doc.js';
import { SyncedDocErrorIcon } from '../embed-synced-doc-block/styles.js';
import { styles } from './styles.js';
import { getEmbedLinkedDocIcons, isLinkToNode } from './utils.js';

@customElement('affine-embed-linked-doc-block')
@Peekable({
  enableOn: ({ doc }: EmbedLinkedDocBlockComponent) => !doc.readonly,
})
export class EmbedLinkedDocBlockComponent extends EmbedBlockComponent<
  EmbedLinkedDocModel,
  EmbedLinkedDocBlockService
> {
  override _cardStyle: (typeof EmbedLinkedDocStyles)[number] = 'horizontal';

  override _height = EMBED_CARD_HEIGHT.horizontal;

  private _load = async () => {
    this._loading = true;
    this.isError = false;
    this.isNoteContentEmpty = true;
    this.isBannerEmpty = true;

    const linkedDoc = this.linkedDoc;
    if (!linkedDoc) {
      this._loading = false;
      return;
    }

    if (!linkedDoc.loaded) {
      try {
        linkedDoc.load();
      } catch (e) {
        console.error(e);
        this.isError = true;
      }
    }

    if (!this.isError && !linkedDoc.root) {
      await new Promise<void>(resolve => {
        linkedDoc.slots.rootAdded.once(() => {
          resolve();
        });
      });
    }

    this._loading = false;

    // If it is a link to a block or element, the content will not be rendered.
    if (this._isLinkToNode) {
      return;
    }

    if (!this.isError) {
      const cardStyle = this.model.style;
      if (cardStyle === 'horizontal' || cardStyle === 'vertical') {
        renderLinkedDocInCard(this);
      }
    }
  };

  private _selectBlock = () => {
    const selectionManager = this.host.selection;
    const blockSelection = selectionManager.create('block', {
      blockId: this.blockId,
    });
    selectionManager.setGroup('note', [blockSelection]);
  };

  private _setDocUpdatedAt = () => {
    const meta = this.doc.collection.meta.getDocMeta(this.model.pageId);
    if (meta) {
      const date = meta.updatedDate || meta.createDate;
      this._docUpdatedAt = new Date(date);
    }
  };

  override _width = EMBED_CARD_WIDTH.horizontal;

  static override styles = styles;

  cleanUpSurfaceRefRenderer = () => {
    if (this.surfaceRefRenderer) {
      this.surfaceRefService.removeRenderer(this.surfaceRefRenderer.id);
    }
  };

  convertToEmbed = () => {
    if (this._isLinkToNode) return;

    const { doc, pageId, caption } = this.model;

    // synced doc entry controlled by awareness flag
    const isSyncedDocEnabled = doc.awarenessStore.getFlag(
      'enable_synced_doc_block'
    );
    if (!isSyncedDocEnabled) {
      return;
    }

    const parent = doc.getParent(this.model);
    assertExists(parent);
    const index = parent.children.indexOf(this.model);

    doc.addBlock('affine:embed-synced-doc', { pageId, caption }, parent, index);

    this.std.selection.setGroup('note', []);
    doc.deleteBlock(this.model);
  };

  covertToInline = () => {
    const { doc } = this.model;
    const parent = doc.getParent(this.model);
    assertExists(parent);
    const index = parent.children.indexOf(this.model);

    const yText = new DocCollection.Y.Text();
    yText.insert(0, REFERENCE_NODE);
    yText.format(0, REFERENCE_NODE.length, {
      reference: {
        type: 'LinkedPage',
        ...this.referenceInfo,
      },
    });
    const text = new doc.Text(yText);

    doc.addBlock(
      'affine:paragraph',
      {
        text,
      },
      parent,
      index
    );

    doc.deleteBlock(this.model);
  };

  open = () => {
    const pageId = this.model.pageId;
    // TODO(@fundon): should scroll into target block/element
    if (pageId === this.doc.id) return;

    const rootComponent = this.std.view.viewFromPath('block', [
      this.doc.root?.id ?? '',
    ]) as RootBlockComponent | null;
    assertExists(rootComponent);

    rootComponent.slots.docLinkClicked.emit(this.referenceInfo);
  };

  refreshData = () => {
    this._load().catch(e => {
      console.error(e);
      this.isError = true;
    });
  };

  protected _handleClick(event: MouseEvent) {
    if (this.config.handleClick) {
      this.config.handleClick(event, this.host);
      return;
    }

    this._selectBlock();
  }

  private _handleDoubleClick(event: MouseEvent) {
    if (this.config.handleDoubleClick) {
      this.config.handleDoubleClick(event, this.host);
      return;
    }

    if (isPeekable(this)) {
      return;
    }
    event.stopPropagation();
    this.open();
  }

  private _isDocEmpty() {
    const linkedDoc = this.linkedDoc;
    if (!linkedDoc) {
      return false;
    }
    return !!linkedDoc && this.isNoteContentEmpty && this.isBannerEmpty;
  }

  private get _rootService() {
    return this.std.spec.getService('affine:page');
  }

  override connectedCallback() {
    super.connectedCallback();

    this._isLinkToNode = isLinkToNode(this.model);

    this._load().catch(e => {
      console.error(e);
      this.isError = true;
    });

    const linkedDoc = this.linkedDoc;
    if (linkedDoc) {
      this.disposables.add(
        linkedDoc.collection.meta.docMetaUpdated.on(() => {
          this._load().catch(e => {
            console.error(e);
            this.isError = true;
          });
        })
      );
      this.disposables.add(
        linkedDoc.slots.blockUpdated.on(payload => {
          if (
            payload.type === 'update' &&
            ['', 'caption', 'xywh'].includes(payload.props.key)
          ) {
            return;
          }

          if (payload.type === 'add' && payload.init) {
            return;
          }

          this._load().catch(e => {
            console.error(e);
            this.isError = true;
          });
        })
      );

      this._setDocUpdatedAt();
      this.disposables.add(
        this.doc.collection.meta.docMetaUpdated.on(() => {
          this._setDocUpdatedAt();
        })
      );

      if (this._isLinkToNode) {
        this._linkedDocMode = this.model.params?.mode ?? DocMode.Page;
      } else {
        this._linkedDocMode = this._rootService.docModeService.getMode(
          this.model.pageId
        );
        this.disposables.add(
          this._rootService.docModeService.onModeChange(mode => {
            this._linkedDocMode = mode;
          }, this.model.pageId)
        );
      }
    }

    this.model.propsUpdated.on(({ key }) => {
      if (key === 'pageId' || key === 'style') {
        this._load().catch(e => {
          console.error(e);
          this.isError = true;
        });
      }
    });
  }

  override disconnectedCallback() {
    this.cleanUpSurfaceRefRenderer();
    super.disconnectedCallback();
  }

  override renderBlock() {
    this._cardStyle = this.model.style;
    this._width = EMBED_CARD_WIDTH[this._cardStyle];
    this._height = EMBED_CARD_HEIGHT[this._cardStyle];

    const linkedDoc = this.linkedDoc;
    const isDeleted = !linkedDoc;
    const isLoading = this._loading;
    const isError = this.isError;
    const isEmpty = this._isDocEmpty() && this.isBannerEmpty;

    const cardClassMap = classMap({
      loading: isLoading,
      error: isError,
      deleted: isDeleted,
      empty: isEmpty,
      'banner-empty': this.isBannerEmpty,
      'note-empty': this.isNoteContentEmpty,
      [this._cardStyle]: true,
    });

    const {
      LoadingIcon,
      ReloadIcon,
      LinkedDocIcon,
      LinkedDocDeletedIcon,
      LinkedDocDeletedBanner,
      LinkedDocEmptyBanner,
      SyncedDocErrorBanner,
    } = getEmbedLinkedDocIcons(this._linkedDocMode, this._cardStyle);

    const titleIcon = isError
      ? SyncedDocErrorIcon
      : isLoading
        ? LoadingIcon
        : isDeleted
          ? LinkedDocDeletedIcon
          : this._isLinkToNode
            ? BlockLinkIcon
            : LinkedDocIcon;

    const titleText = isError
      ? linkedDoc?.meta?.title || 'Untitled'
      : isLoading
        ? 'Loading...'
        : isDeleted
          ? `Deleted doc`
          : linkedDoc?.meta?.title || 'Untitled';

    const showDefaultNoteContent = isError || isLoading || isDeleted || isEmpty;
    const defaultNoteContent = isError
      ? 'This linked doc failed to load.'
      : isLoading
        ? ''
        : isDeleted
          ? 'This linked doc is deleted.'
          : isEmpty
            ? 'Preview of the doc will be displayed here.'
            : '';

    const dateText =
      this._cardStyle === 'cube'
        ? this._docUpdatedAt.toLocaleTimeString()
        : this._docUpdatedAt.toLocaleString();

    const showDefaultBanner = isError || isLoading || isDeleted || isEmpty;

    const defaultBanner = isError
      ? SyncedDocErrorBanner
      : isLoading
        ? LinkedDocEmptyBanner
        : isDeleted
          ? LinkedDocDeletedBanner
          : LinkedDocEmptyBanner;

    return this.renderEmbed(
      () => html`
        <div>
          <div
            class="affine-embed-linked-doc-block ${cardClassMap}"
            @click=${this._handleClick}
            @dblclick=${this._handleDoubleClick}
          >
            <div class="affine-embed-linked-doc-content">
              <div class="affine-embed-linked-doc-content-title">
                <div class="affine-embed-linked-doc-content-title-icon">
                  ${titleIcon}
                </div>

                <div class="affine-embed-linked-doc-content-title-text">
                  ${titleText}
                </div>
              </div>

              <div class="affine-embed-linked-doc-content-note render"></div>
              ${showDefaultNoteContent
                ? html`<div
                    class="affine-embed-linked-doc-content-note default"
                  >
                    ${defaultNoteContent}
                  </div>`
                : nothing}
              ${isError
                ? html`
                    <div class="affine-embed-linked-doc-card-content-reload">
                      <div
                        class="affine-embed-linked-doc-card-content-reload-button"
                        @click=${this.refreshData}
                      >
                        ${ReloadIcon} <span>Reload</span>
                      </div>
                    </div>
                  `
                : html`
                    <div class="affine-embed-linked-doc-content-date">
                      <span>Updated</span>

                      <span>${dateText}</span>
                    </div>
                  `}
            </div>

            <div class="affine-embed-linked-doc-banner render"></div>

            ${showDefaultBanner
              ? html`
                  <div class="affine-embed-linked-doc-banner default">
                    ${defaultBanner}
                  </div>
                `
              : nothing}
            <div class="affine-embed-linked-doc-block-overlay"></div>
          </div>
        </div>
      `
    );
  }

  override updated() {
    // update card style when linked doc deleted
    const linkedDoc = this.linkedDoc;
    const { xywh, style } = this.model;
    const bound = Bound.deserialize(xywh);
    if (linkedDoc && style === 'horizontalThin') {
      bound.w = EMBED_CARD_WIDTH.horizontal;
      bound.h = EMBED_CARD_HEIGHT.horizontal;
      this.doc.withoutTransact(() => {
        this.doc.updateBlock(this.model, {
          xywh: bound.serialize(),
          style: 'horizontal',
        });
      });
    } else if (!linkedDoc && style === 'horizontal') {
      bound.w = EMBED_CARD_WIDTH.horizontalThin;
      bound.h = EMBED_CARD_HEIGHT.horizontalThin;
      this.doc.withoutTransact(() => {
        this.doc.updateBlock(this.model, {
          xywh: bound.serialize(),
          style: 'horizontalThin',
        });
      });
    }
  }

  get config(): EmbedLinkedDocBlockConfig {
    return this.std.spec.getConfig('affine:embed-linked-doc') || {};
  }

  get docTitle() {
    return this.linkedDoc?.meta?.title.length
      ? this.linkedDoc.meta.title
      : 'Untitled';
  }

  get editorMode() {
    return this._linkedDocMode;
  }

  get linkedDoc() {
    return this.std.collection.getDoc(this.model.pageId);
  }

  get referenceInfo(): ReferenceInfo {
    const { pageId, params } = this.model;
    const info: ReferenceInfo = { pageId };
    if (!params) return info;

    const { mode, blockIds, elementIds } = params;
    info.params = {};
    if (mode) info.params.mode = mode;
    if (blockIds?.length) info.params.blockIds = [...blockIds];
    if (elementIds?.length) info.params.elementIds = [...elementIds];
    return info;
  }

  @state()
  private accessor _docUpdatedAt: Date = new Date();

  // linking block/element
  @state()
  private accessor _isLinkToNode = false;

  @state()
  private accessor _linkedDocMode: DocMode = DocMode.Page;

  @state()
  private accessor _loading = false;

  @queryAsync('.affine-embed-linked-doc-banner.render')
  accessor bannerContainer!: Promise<HTMLDivElement>;

  @property({ attribute: false })
  accessor isBannerEmpty = false;

  @property({ attribute: false })
  accessor isError = false;

  @property({ attribute: false })
  accessor isNoteContentEmpty = false;

  @queryAsync('.affine-embed-linked-doc-content-note.render')
  accessor noteContainer!: Promise<HTMLDivElement>;

  @property({ attribute: false })
  accessor surfaceRefRenderer: SurfaceRefRenderer | undefined = undefined;

  @property({ attribute: false })
  accessor surfaceRefService!: SurfaceRefBlockService;
}
