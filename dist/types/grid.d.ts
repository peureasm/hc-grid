export type GridAlign = 'left' | 'center' | 'right';
export type HcGridAlign = GridAlign;
export type GridRow = Record<string, unknown>;
export type HcGridRow = GridRow;
export type GridFormatter = (value: unknown, row: GridRow, column: GridColumn, rowIndex: number) => unknown;
export type GridCellComponent = 'button' | 'checkbox' | 'dropdown-menu' | 'input' | 'select' | 'multi-select' | 'badge';
export type GridOption = {
    label: string;
    value: unknown;
};
export type GridColumn = {
    field: string;
    header: string;
    width?: number;
    minWidth?: number;
    align?: GridAlign;
    sortable?: boolean;
    resizable?: boolean;
    editable?: boolean;
    formatter?: GridFormatter;
    component?: GridCellComponent;
    options?: GridOption[];
    buttonLabel?: string;
    dropdownLabel?: string;
};
export type GridSortDirection = 'asc' | 'desc';
export type GridSortState = {
    field: string;
    direction: GridSortDirection;
} | null;
export type HcGridColumn<TRow extends HcGridRow = HcGridRow> = GridColumn;
export type GridRowClickDetail = {
    row: GridRow;
    index: number;
};
export type GridCellClickDetail = {
    row: GridRow;
    column: GridColumn;
    rowIndex: number;
    value: unknown;
};
export type GridSortChangeDetail = {
    sortState: GridSortState;
};
export type GridSelectionChangeDetail = {
    rows: GridRow[];
};
export type GridCellEditDetail = {
    row: GridRow;
    column: GridColumn;
    rowIndex: number;
    oldValue: unknown;
    value: unknown;
};
export type GridPageChangeDetail = {
    page: number;
    pageSize: number;
    totalRows: number;
    totalPages: number;
};
export type GridCellActionDetail = {
    row: GridRow;
    column: GridColumn;
    rowIndex: number;
    value: unknown;
    action: string;
};
export type GridPageInfo = GridPageChangeDetail;
export type GridExportOptions = {
    fileName?: string;
    includeHeaders?: boolean;
    rows?: GridRow[];
};
export type HcGridRowClickDetail<TRow extends HcGridRow = HcGridRow> = GridRowClickDetail & {
    row: TRow;
};
export type HcGridCellClickDetail<TRow extends HcGridRow = HcGridRow> = GridCellClickDetail & {
    row: TRow;
};
export type HcGridSortChangeDetail = GridSortChangeDetail;
export type HcGridSelectionChangeDetail = GridSelectionChangeDetail;
export type HcGridCellEditDetail = GridCellEditDetail;
export type HcGridPageChangeDetail = GridPageChangeDetail;
export type HcGridCellActionDetail = GridCellActionDetail;
//# sourceMappingURL=grid.d.ts.map