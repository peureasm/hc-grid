import { HcGrid } from './components/HcGrid';
export type { GridAlign, HcGridAlign, GridCellComponent, GridColumn, GridFormatter, GridOption, GridRow, GridSortDirection, GridSortState, GridRowClickDetail, GridCellClickDetail, GridSortChangeDetail, GridSelectionChangeDetail, GridCellEditDetail, GridCellActionDetail, GridPageChangeDetail, GridPageInfo, GridExportOptions, HcGridColumn, HcGridRow, HcGridCellClickDetail, HcGridRowClickDetail, HcGridSortChangeDetail, HcGridSelectionChangeDetail, HcGridCellEditDetail, HcGridCellActionDetail, HcGridPageChangeDetail } from './types/grid';
export { HcGrid };
export { HcGrid as HcGridElement };
export { escapeHtml } from './utils/escapeHtml';
export declare function defineHcGrid(tagName?: string): void;
declare global {
    interface HTMLElementTagNameMap {
        'hc-grid': HcGrid;
    }
}
//# sourceMappingURL=index.d.ts.map