import { popMenu } from '@blocksuite/affine-components/context-menu';
import { AddCursorIcon } from '@blocksuite/affine-components/icons';
import { css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { html } from 'lit/static-html.js';
import Sortable from 'sortablejs';

import type { KanbanSingleView } from './kanban-view-manager.js';
import type { KanbanViewSelectionWithType } from './types.js';

import '../../../common/group-by/define.js';
import { renderUniLit } from '../../../utils/uni-component/uni-component.js';
import { DataViewBase } from '../../data-view-base.js';
import { KanbanClipboardController } from './controller/clipboard.js';
import './controller/drag.js';
import { KanbanDragController } from './controller/drag.js';
import { KanbanHotkeysController } from './controller/hotkeys.js';
import { KanbanSelectionController } from './controller/selection.js';
import './group.js';
import { KanbanGroup } from './group.js';
import './header.js';

const styles = css`
  affine-data-view-kanban {
    user-select: none;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .affine-data-view-kanban-groups {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 20px;
    width: 100%;
    padding-bottom: 4px;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .affine-data-view-kanban-groups:hover {
    padding-bottom: 0px;
  }

  .affine-data-view-kanban-groups::-webkit-scrollbar {
    -webkit-appearance: none;
    display: block;
  }

  .affine-data-view-kanban-groups::-webkit-scrollbar:horizontal {
    height: 4px;
  }

  .affine-data-view-kanban-groups::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: transparent;
  }

  .affine-data-view-kanban-groups:hover::-webkit-scrollbar:horizontal {
    height: 8px;
  }

  .affine-data-view-kanban-groups:hover::-webkit-scrollbar-thumb {
    border-radius: 16px;
    background-color: var(--affine-black-30);
  }

  .affine-data-view-kanban-groups:hover::-webkit-scrollbar-track {
    background-color: var(--affine-hover-color);
  }

  .add-group-icon {
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .add-group-icon:hover {
    background-color: var(--affine-hover-color);
  }

  .add-group-icon svg {
    width: 16px;
    height: 16px;
    fill: var(--affine-icon-color);
    color: var(--affine-icon-color);
  }
`;

@customElement('affine-data-view-kanban')
export class DataViewKanban extends DataViewBase<
  KanbanSingleView,
  KanbanViewSelectionWithType
> {
  private dragController = new KanbanDragController(this);

  static override styles = styles;

  clipboardController = new KanbanClipboardController(this);

  hotkeysController = new KanbanHotkeysController(this);

  onWheel = (event: WheelEvent) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    const ele = event.currentTarget;
    if (ele instanceof HTMLElement) {
      if (ele.scrollWidth === ele.clientWidth) {
        return;
      }
      event.stopPropagation();
    }
  };

  renderAddGroup = () => {
    const addGroup = this.groupManager.addGroup;
    if (!addGroup) {
      return;
    }
    const add = (e: MouseEvent) => {
      const ele = e.currentTarget as HTMLElement;
      popMenu(ele, {
        options: {
          input: {
            onComplete: text => {
              const column = this.groupManager.column$.value;
              if (column) {
                column.updateData(
                  () => addGroup(text, column.data$.value) as never
                );
              }
            },
          },
          items: [],
        },
      });
    };
    return html` <div
      style="height: 32px;width: 100px;flex-shrink:0;display:flex;align-items:center;"
      @click="${add}"
    >
      <div class="add-group-icon">${AddCursorIcon}</div>
    </div>`;
  };

  selectionController = new KanbanSelectionController(this);

  override firstUpdated() {
    const sortable = Sortable.create(this.groups, {
      group: `kanban-group-drag-${this.view.id}`,
      handle: '.group-header',
      draggable: 'affine-data-view-kanban-group',
      animation: 100,
      onEnd: evt => {
        if (evt.item instanceof KanbanGroup) {
          const groups = Array.from(
            this.groups.querySelectorAll('affine-data-view-kanban-group')
          );

          const key =
            evt.newIndex != null
              ? groups[evt.newIndex - 1]?.group.key
              : undefined;
          this.groupManager?.moveGroupTo(
            evt.item.group.key,
            key
              ? {
                  before: false,
                  id: key,
                }
              : 'start'
          );
        }
      },
    });
    this._disposables.add({
      dispose: () => {
        sortable.destroy();
      },
    });
  }

  focusFirstCell(): void {
    this.selectionController.focusFirstCell();
  }

  getSelection() {
    return this.selectionController.selection;
  }

  hideIndicator(): void {
    this.dragController.dropPreview.remove();
  }

  moveTo(id: string, evt: MouseEvent): void {
    const position = this.dragController.getInsertPosition(evt);
    if (position) {
      position.group.group.manager.moveCardTo(
        id,
        '',
        position.group.group.key,
        position.position
      );
    }
  }

  override render() {
    const groups = this.groupManager.groupsDataList$.value;
    if (!groups) {
      return html``;
    }

    return html`
      ${renderUniLit(this.headerWidget, {
        view: this.view,
        viewMethods: this,
      })}
      <div class="affine-data-view-kanban-groups" @wheel="${this.onWheel}">
        ${repeat(
          groups,
          group => group.key,
          group => {
            return html` <affine-data-view-kanban-group
              data-key="${group.key}"
              .dataViewEle="${this.dataViewEle}"
              .view="${this.view}"
              .group="${group}"
            ></affine-data-view-kanban-group>`;
          }
        )}
        ${this.renderAddGroup()}
      </div>
    `;
  }

  showIndicator(evt: MouseEvent): boolean {
    return this.dragController.shooIndicator(evt, undefined) != null;
  }

  get groupManager() {
    return this.view.groupManager;
  }

  @query('.affine-data-view-kanban-groups')
  accessor groups!: HTMLElement;
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-data-view-kanban': DataViewKanban;
  }
}
