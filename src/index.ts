import { HcGrid } from './components/HcGrid';

export type {
  GridAlign,
  HcGridAlign,
  GridCellComponent,
  GridColumn,
  GridFormatter,
  GridOption,
  GridRow,
  GridSortDirection,
  GridSortState,
  GridRowClickDetail,
  GridCellClickDetail,
  GridSortChangeDetail,
  GridSelectionChangeDetail,
  GridCellEditDetail,
  GridCellActionDetail,
  GridPageChangeDetail,
  GridPageInfo,
  GridExportOptions,
  HcGridColumn,
  HcGridRow,
  HcGridCellClickDetail,
  HcGridRowClickDetail,
  HcGridSortChangeDetail,
  HcGridSelectionChangeDetail,
  HcGridCellEditDetail,
  HcGridCellActionDetail,
  HcGridPageChangeDetail
} from './types/grid';

export { HcGrid };
export { HcGrid as HcGridElement };
export { escapeHtml } from './utils/escapeHtml';

export function defineHcGrid(tagName = 'hc-grid'): void {
  if (!globalThis.customElements) {
    return;
  }

  if (!globalThis.customElements.get(tagName)) {
    globalThis.customElements.define(tagName, HcGrid);
  }
}

defineHcGrid();

declare global {
  interface HTMLElementTagNameMap {
    'hc-grid': HcGrid;
  }
}
