import { createModal } from '@blocksuite/affine-components/context-menu';
import { ShadowlessElement } from '@blocksuite/block-std';
import {
  type ReferenceElement,
  autoUpdate,
  computePosition,
  size,
} from '@floating-ui/dom';
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import type { SingleView } from '../../view-manager/single-view.js';

import { CrossIcon } from '../icons/index.js';
import { RecordDetail } from './detail.js';

@customElement('side-layout-modal')
class SideLayoutModal extends ShadowlessElement {
  static override styles = css`
    side-layout-modal {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 1200px;
      background-color: var(--affine-background-overlay-panel-color);
      border-left: 0.5px solid var(--affine-border-color);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    }

    .side-modal-content {
      flex: 1;
      overflow-y: auto;
    }

    .side-modal-header {
      padding: 12px;
      display: flex;
      align-items: center;
    }

    .header-ops {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .header-op {
      display: flex;
      align-items: center;
      padding: 2px;
      border-radius: 4px;
      cursor: pointer;
    }

    .header-op svg {
      width: 20px;
      height: 20px;
      color: var(--affine-icon-color);
    }

    .header-op:hover {
      background-color: var(--affine-hover-color);
    }
  `;

  override render() {
    return html`
      <div class="side-modal-header">
        <div @click="${this.close}" class="close-modal header-op">
          ${CrossIcon}
        </div>
        <div class="header-ops">${this.renderOps()}</div>
      </div>
      <div class="side-modal-content">${this.content}</div>
    `;
  }

  renderOps() {
    return html``;
    // return html`
    //   <div class='header-op' style='transform: rotate(180deg)'>
    //     ${arrowUp}
    //   </div>
    //   <div class='header-op'>${arrowUp}</div>`;
  }

  @property({ attribute: false })
  accessor close: (() => void) | undefined = undefined;

  @property({ attribute: false })
  accessor content: HTMLElement | undefined = undefined;
}

export const popSideDetail = (ops: {
  target: ReferenceElement;
  view: SingleView;
  rowId: string;
  onClose?: () => void;
}) => {
  const modal = createModal(document.body);
  // fit to the size of the body element
  const cancel = autoUpdate(ops.target, modal, () => {
    computePosition(ops.target, modal, {
      middleware: [
        size({
          apply: ({ rects }) => {
            Object.assign(modal.style, {
              left: `${rects.reference.x}px`,
              top: `${rects.reference.y}px`,
              width: `${rects.reference.width}px`,
              height: `${rects.reference.height}px`,
            });
          },
        }),
      ],
    }).catch(console.error);
  });
  const close = () => {
    modal.remove();
    ops.onClose?.();
    cancel();
  };
  const detail = new RecordDetail();
  detail.view = ops.view;
  detail.rowId = ops.rowId;
  const sideContainer = new SideLayoutModal();
  sideContainer.content = detail;
  sideContainer.close = close;
  modal.onclick = e => e.target === modal && close();
  modal.append(sideContainer);
};

export const createRecordDetail = (ops: {
  view: SingleView;
  rowId: string;
}) => {
  return html`<affine-data-view-record-detail
    .view=${ops.view}
    .rowId=${ops.rowId}
    class="data-view-popup-container"
  ></affine-data-view-record-detail>`;
};
