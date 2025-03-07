import type { EditorHost } from '@blocksuite/block-std';

import { Bound } from '@blocksuite/global/utils';
import { assertExists } from '@blocksuite/global/utils';

import type { CanvasRenderer } from '../../../surface-block/renderer/canvas-renderer.js';
import type { SurfaceRefBlockComponent } from '../../../surface-ref-block/surface-ref-block.js';

import { isTopLevelBlock } from '../../../root-block/edgeless/utils/query.js';

export const edgelessToBlob = async (
  host: EditorHost,
  options: {
    surfaceRefBlock: SurfaceRefBlockComponent;
    surfaceRenderer: CanvasRenderer;
    edgelessElement: BlockSuite.EdgelessModel;
  }
): Promise<Blob> => {
  const { edgelessElement } = options;
  const rootService = host.spec.getService('affine:page');
  const exportManager = rootService.exportManager;
  const bound = Bound.deserialize(edgelessElement.xywh);
  const isBlock = isTopLevelBlock(edgelessElement);

  return exportManager
    .edgelessToCanvas(
      options.surfaceRenderer,
      bound,
      undefined,
      isBlock ? [edgelessElement] : undefined,
      isBlock ? undefined : [edgelessElement],
      { zoom: options.surfaceRenderer.viewport.zoom }
    )
    .then(canvas => {
      assertExists(canvas);
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          blob => (blob ? resolve(blob) : reject(null)),
          'image/png'
        );
      });
    });
};

export const writeImageBlobToClipboard = async (blob: Blob) => {
  // @ts-ignore
  if (window.apis?.clipboard?.copyAsImageFromString) {
    // @ts-ignore
    await window.apis.clipboard?.copyAsImageFromString(blob);
  } else {
    await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
  }
};
