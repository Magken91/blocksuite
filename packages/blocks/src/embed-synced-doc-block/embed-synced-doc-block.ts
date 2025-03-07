import type { EditorHost } from '@blocksuite/block-std';

import {
  EmbedEdgelessIcon,
  EmbedPageIcon,
} from '@blocksuite/affine-components/icons';
import { Peekable } from '@blocksuite/affine-components/peek';
import { REFERENCE_NODE } from '@blocksuite/affine-components/rich-text';
import {
  DocMode,
  type EmbedSyncedDocModel,
  NoteDisplayMode,
} from '@blocksuite/affine-model';
import { ThemeObserver } from '@blocksuite/affine-shared/theme';
import { assertExists } from '@blocksuite/global/utils';
import { BlockViewType, DocCollection, type Query } from '@blocksuite/store';
import { type PropertyValues, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { classMap } from 'lit/directives/class-map.js';
import { guard } from 'lit/directives/guard.js';
import { styleMap } from 'lit/directives/style-map.js';

import type { EdgelessRootService } from '../root-block/edgeless/edgeless-root-service.js';
import type { RootBlockComponent } from '../root-block/types.js';
import type { EmbedSyncedDocCard } from './components/embed-synced-doc-card.js';
import type { EmbedSyncedDocBlockService } from './embed-synced-doc-service.js';

import { EMBED_CARD_HEIGHT, EMBED_CARD_WIDTH } from '../_common/consts.js';
import { EmbedBlockComponent } from '../_common/embed-block-helper/embed-block-element.js';
import { isEmptyDoc } from '../_common/utils/render-linked-doc.js';
import { SpecProvider } from '../_specs/utils/spec-provider.js';
import './components/embed-synced-doc-card.js';
import { blockStyles } from './styles.js';

@customElement('affine-embed-synced-doc-block')
@Peekable({
  enableOn: ({ doc }: EmbedSyncedDocBlockComponent) => !doc.readonly,
})
export class EmbedSyncedDocBlockComponent extends EmbedBlockComponent<
  EmbedSyncedDocModel,
  EmbedSyncedDocBlockService
> {
  protected _buildPreviewSpec = (name: 'page:preview' | 'edgeless:preview') => {
    const nextDepth = this.depth + 1;
    const previewSpecBuilder = SpecProvider.getInstance().getSpec(name);
    const currentDisposables = this.disposables;

    previewSpecBuilder.setup(
      'affine:embed-synced-doc',
      (slots, disposableGroup) => {
        disposableGroup.add(
          slots.viewConnected.on(({ component }) => {
            const nextComponent = component as EmbedSyncedDocBlockComponent;
            nextComponent.depth = nextDepth;
            currentDisposables.add(() => {
              nextComponent.depth = 0;
            });
          })
        );
        disposableGroup.add(
          slots.viewDisconnected.on(({ component }) => {
            const nextComponent = component as EmbedSyncedDocBlockComponent;
            nextComponent.depth = 0;
          })
        );
      }
    );

    return previewSpecBuilder.value;
  };

  private _initEdgelessFitEffect = () => {
    const fitToContent = () => {
      if (this.syncedDocMode !== 'edgeless') return;

      const service = this.syncedDocEditorHost?.std.spec.getService(
        'affine:page'
      ) as EdgelessRootService;

      if (!service) return;

      service.viewport.onResize();
      service.zoomToFit();
    };

    const observer = new ResizeObserver(fitToContent);
    const block = this.embedBlock;

    observer.observe(block);

    this._disposables.add(() => {
      observer.disconnect();
    });

    this.syncedDocEditorHost?.updateComplete
      .then(() => {
        fitToContent();
      })
      .catch(() => {});
  };

  private _pageFilter: Query = {
    mode: 'loose',
    match: [
      {
        flavour: 'affine:note',
        props: {
          displayMode: NoteDisplayMode.EdgelessOnly,
        },
        viewType: BlockViewType.Hidden,
      },
    ],
  };

  protected _renderSyncedView = () => {
    const syncedDoc = this.syncedDoc;
    const editorMode = this.syncedDocMode;

    assertExists(syncedDoc);

    if (this.isPageMode) {
      this.style.width = 'calc(100% + 48px)';
      this.style.marginLeft = '-24px';
      this.style.marginRight = '-24px';
    }

    const containerStyleMap = styleMap({
      position: 'relative',
      width: '100%',
    });

    const theme = ThemeObserver.mode;
    const isSelected = !!this.selected?.is('block');

    this.dataset.nestedEditor = '';

    const renderEditor = () => {
      return choose(editorMode, [
        [
          DocMode.Page,
          () => html`
            <div class="affine-page-viewport">
              ${this.host.renderSpecPortal(
                syncedDoc,
                this._buildPreviewSpec('page:preview')
              )}
            </div>
          `,
        ],
        [
          DocMode.Edgeless,
          () => html`
            <div class="affine-edgeless-viewport">
              ${this.host.renderSpecPortal(
                syncedDoc,
                this._buildPreviewSpec('edgeless:preview')
              )}
            </div>
          `,
        ],
      ]);
    };

    const icon = this.isPageMode ? EmbedPageIcon : EmbedEdgelessIcon;

    return this.renderEmbed(
      () => html`
        <div
          class=${classMap({
            'affine-embed-synced-doc-container': true,
            [editorMode]: true,
            [theme]: true,
            selected: isSelected,
            surface: false,
          })}
          @click=${this._handleClick}
          style=${containerStyleMap}
          ?data-scale=${undefined}
        >
          <div class="affine-embed-synced-doc-editor">
            ${this.isPageMode && this._isEmptySyncedDoc
              ? html`
                  <div class="affine-embed-synced-doc-editor-empty">
                    <span>
                      This is a linked doc, you can add content here.
                    </span>
                  </div>
                `
              : guard([editorMode, syncedDoc], renderEditor)}
          </div>
          <div
            class=${classMap({
              'affine-embed-synced-doc-header-wrapper': true,
              selected: isSelected,
            })}
          >
            <div class="affine-embed-synced-doc-header">
              ${icon}
              <span class="affine-embed-synced-doc-title">
                ${this.docTitle}
              </span>
            </div>
          </div>
        </div>
      `
    );
  };

  static override styles = blockStyles;

  protected cardStyleMap = styleMap({
    position: 'relative',
    display: 'block',
    width: '100%',
  });

  convertToCard = () => {
    const { doc, pageId, caption } = this.model;

    const parent = doc.getParent(this.model);
    assertExists(parent);
    const index = parent.children.indexOf(this.model);

    doc.addBlock('affine:embed-linked-doc', { pageId, caption }, parent, index);

    this.std.selection.setGroup('note', []);
    doc.deleteBlock(this.model);
  };

  covertToInline = () => {
    const { doc, pageId } = this.model;
    const parent = doc.getParent(this.model);
    assertExists(parent);
    const index = parent.children.indexOf(this.model);

    const yText = new DocCollection.Y.Text();
    yText.insert(0, REFERENCE_NODE);
    yText.format(0, REFERENCE_NODE.length, {
      reference: { type: 'LinkedPage', pageId },
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
    if (pageId === this.doc.id) return;

    const rootComponent = this.std.view.viewFromPath('block', [
      this.doc.root?.id ?? '',
    ]) as RootBlockComponent | null;
    assertExists(rootComponent);

    rootComponent.slots.docLinkClicked.emit({ pageId });
  };

  refreshData = () => {
    this._load().catch(e => {
      console.error(e);
      this._error = true;
    });
  };

  private _checkCycle() {
    let editorHost: EditorHost | null = this.host;
    while (editorHost && !this._cycle) {
      this._cycle = !!editorHost && editorHost.doc.id === this.model.pageId;
      editorHost =
        editorHost.parentElement?.closest<EditorHost>('editor-host') ?? null;
    }
  }

  protected _handleClick(_event: MouseEvent) {
    this._selectBlock();
  }

  private _isClickAtBorder(
    event: MouseEvent,
    element: HTMLElement,
    tolerance = 8
  ): boolean {
    const { x, y } = event;
    const rect = element.getBoundingClientRect();
    if (!rect) {
      return false;
    }

    return (
      Math.abs(x - rect.left) < tolerance ||
      Math.abs(x - rect.right) < tolerance ||
      Math.abs(y - rect.top) < tolerance ||
      Math.abs(y - rect.bottom) < tolerance
    );
  }

  private async _load() {
    this._loading = true;
    this._error = false;
    this._deleted = false;
    this._cycle = false;

    const syncedDoc = this.syncedDoc;
    if (!syncedDoc) {
      this._deleted = true;
      this._loading = false;
      return;
    }

    this._checkCycle();

    if (!syncedDoc.loaded) {
      try {
        syncedDoc.load();
      } catch (e) {
        console.error(e);
        this._error = true;
      }
    }

    if (!this._error && !syncedDoc.root) {
      await new Promise<void>(resolve => {
        syncedDoc.slots.rootAdded.once(() => resolve());
      });
    }

    this._loading = false;
  }

  private get _rootService() {
    return this.std.spec.getService('affine:page');
  }

  private _selectBlock() {
    const selectionManager = this.host.selection;
    const blockSelection = selectionManager.create('block', {
      blockId: this.blockId,
    });
    selectionManager.setGroup('note', [blockSelection]);
  }

  private _setDocUpdatedAt() {
    const meta = this.doc.collection.meta.getDocMeta(this.model.pageId);
    if (meta) {
      const date = meta.updatedDate || meta.createDate;
      this._docUpdatedAt = new Date(date);
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    this.style.display = 'block';
    this._load().catch(e => {
      console.error(e);
      this._error = true;
    });

    this.contentEditable = 'false';

    this.model.propsUpdated.on(({ key }) => {
      if (key === 'pageId' || key === 'style') {
        this._load().catch(e => {
          console.error(e);
          this._error = true;
        });
      }
    });

    this._setDocUpdatedAt();
    this.disposables.add(
      this.doc.collection.meta.docMetaUpdated.on(() => {
        this._setDocUpdatedAt();
      })
    );

    if (this._rootService) {
      this.syncedDocMode = this._rootService.docModeService.getMode(
        this.model.pageId
      );
      this._isEmptySyncedDoc = isEmptyDoc(this.syncedDoc, this.syncedDocMode);
      this.disposables.add(
        this._rootService.docModeService.onModeChange(mode => {
          this.syncedDocMode = mode;
          this._isEmptySyncedDoc = isEmptyDoc(this.syncedDoc, mode);
        }, this.model.pageId)
      );
    }

    this.syncedDoc &&
      this.disposables.add(
        this.syncedDoc.slots.blockUpdated.on(() => {
          this._isEmptySyncedDoc = isEmptyDoc(
            this.syncedDoc,
            this.syncedDocMode
          );
        })
      );
  }

  override firstUpdated() {
    this.disposables.addFromEvent(this, 'click', e => {
      e.stopPropagation();
      if (this._isClickAtBorder(e, this)) {
        e.preventDefault();
        this._selectBlock();
      }
    });

    // Forward docLinkClicked event from the synced doc
    const syncedDocRootService =
      this.syncedDocEditorHost?.std.spec.getService('affine:page');
    syncedDocRootService &&
      this.disposables.add(
        syncedDocRootService.slots.docLinkClicked.on(({ pageId }) => {
          this._rootService?.slots.docLinkClicked.emit({ pageId });
        })
      );

    this._initEdgelessFitEffect();
  }

  override renderBlock() {
    delete this.dataset.nestedEditor;

    const { style } = this.model;

    this._cardStyle = style;
    this._width = EMBED_CARD_WIDTH[style];
    this._height = EMBED_CARD_HEIGHT[style];

    const syncedDoc = this.syncedDoc;
    const { isLoading, isError, isDeleted, isCycle } = this.blockState;
    const isCardOnly = this.depth >= 1;

    if (
      isLoading ||
      isError ||
      isDeleted ||
      isCardOnly ||
      isCycle ||
      !syncedDoc
    ) {
      return this.renderEmbed(
        () => html`
          <affine-embed-synced-doc-card
            style=${this.cardStyleMap}
            .block=${this}
          ></affine-embed-synced-doc-card>
        `
      );
    }

    return this._renderSyncedView();
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    this.syncedDocCard?.requestUpdate();
  }

  get blockState() {
    return {
      isLoading: this._loading,
      isError: this._error,
      isDeleted: this._deleted,
      isCycle: this._cycle,
    };
  }

  get docTitle() {
    return this.syncedDoc?.meta?.title.length
      ? this.syncedDoc.meta.title
      : 'Untitled';
  }

  get docUpdatedAt() {
    return this._docUpdatedAt;
  }

  get editorMode() {
    return this.syncedDocMode;
  }

  protected get isPageMode() {
    return this.syncedDocMode === DocMode.Page;
  }

  get syncedDoc() {
    return this.syncedDocMode === DocMode.Page
      ? this.std.collection.getDoc(this.model.pageId, {
          readonly: true,
          query: this._pageFilter,
        })
      : this.std.collection.getDoc(this.model.pageId, {
          readonly: true,
        });
  }

  @state()
  private accessor _cycle = false;

  @state()
  private accessor _deleted = false;

  @state()
  private accessor _docUpdatedAt: Date = new Date();

  @state()
  private accessor _error = false;

  @state()
  protected accessor _isEmptySyncedDoc: boolean = true;

  @state()
  private accessor _loading = false;

  @state()
  accessor depth = 0;

  @query(
    ':scope > .affine-block-component > .embed-block-container > affine-embed-synced-doc-card'
  )
  accessor syncedDocCard: EmbedSyncedDocCard | null = null;

  @query(
    ':scope > .affine-block-component > .embed-block-container > .affine-embed-synced-doc-container > .affine-embed-synced-doc-editor > div > editor-host'
  )
  accessor syncedDocEditorHost: EditorHost | null = null;

  @state()
  accessor syncedDocMode: DocMode = DocMode.Page;

  override accessor useCaptionEditor = false;
}
