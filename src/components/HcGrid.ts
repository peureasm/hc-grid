import { gridStyles } from '../styles/variables';
import type {
  GridCellActionDetail,
  GridCellClickDetail,
  GridCellEditDetail,
  GridColumn,
  GridExportOptions,
  GridOption,
  GridPageChangeDetail,
  GridPageInfo,
  GridRow,
  GridRowClickDetail,
  GridSelectionChangeDetail,
  GridSortChangeDetail,
  GridSortDirection,
  GridSortState
} from '../types/grid';
import { escapeHtml } from '../utils/escapeHtml';

const DEFAULT_EMPTY_TEXT = 'No data';
const CHECKBOX_COLUMN_WIDTH = 44;
const DEFAULT_ROW_HEIGHT = 40;

type GridEditingCell = {
  row: GridRow;
  column: GridColumn;
  rowIndex: number;
};

type GridResizeState = {
  field: string;
  startX: number;
  startWidth: number;
};

type GridPopupState = {
  kind: 'dropdown' | 'multi-select';
  row: GridRow;
  column: GridColumn;
  rowIndex: number;
  value: unknown;
  anchor: {
    left: number;
    top: number;
    width: number;
  };
};

export class HcGrid extends HTMLElement {
  static get observedAttributes(): string[] {
    return ['height', 'empty-text'];
  }

  private _columns: GridColumn[] = [];
  private _rows: GridRow[] = [];
  private _sortState: GridSortState = null;
  private _selectedIndex: number | null = null;
  private shadow: ShadowRoot;
  private _emptyText = DEFAULT_EMPTY_TEXT;
  private _isConnected = false;
  private _checkboxSelection = false;
  private _checkedRows = new Set<GridRow>();
  private _columnWidths = new Map<string, number>();
  private _pagination = false;
  private _page = 1;
  private _pageSize = 20;
  private _virtualScroll = false;
  private _rowHeight = DEFAULT_ROW_HEIGHT;
  private _editingCell: GridEditingCell | null = null;
  private _resizeState: GridResizeState | null = null;
  private _popup: GridPopupState | null = null;
  private handleDocumentPointerDown = (event: PointerEvent): void => {
    if (event.composedPath().includes(this)) {
      return;
    }

    this.closePopup();
  };

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = `
      <style>${gridStyles}</style>
      <div class="hc-grid" part="container" role="grid">
        <div class="hc-grid__header" part="header" role="row"></div>
        <div class="hc-grid__body" part="body"></div>
      </div>
      <div class="hc-grid__pager" part="pager" hidden></div>
      <div class="hc-grid__overlay" part="overlay"></div>
    `;

    this.getContainer().addEventListener('scroll', () => {
      if (this._virtualScroll) {
        this.renderBody(this.getBody(), this.getTemplateColumns());
      }

      this.closePopup();
    });
  }

  connectedCallback(): void {
    this.upgradeProperty('columns');
    this.upgradeProperty('rows');
    this.upgradeProperty('emptyText');
    this.upgradeProperty('checkboxSelection');
    this.upgradeProperty('pagination');
    this.upgradeProperty('page');
    this.upgradeProperty('pageSize');
    this.upgradeProperty('virtualScroll');
    this.upgradeProperty('rowHeight');
    this._isConnected = true;
    this.syncAttributes();
    this.render();
    document.addEventListener('pointerdown', this.handleDocumentPointerDown);
  }

  disconnectedCallback(): void {
    document.removeEventListener('pointerdown', this.handleDocumentPointerDown);
  }

  attributeChangedCallback(name: string): void {
    if (name === 'empty-text') {
      this._emptyText = this.getAttribute('empty-text') || DEFAULT_EMPTY_TEXT;
    }

    if (this._isConnected) {
      this.syncAttributes();
      this.render();
    }
  }

  set columns(value: GridColumn[] | null | undefined) {
    this._columns = Array.isArray(value) ? value : [];
    this.resetSortIfColumnMissing();
    this.renderIfReady();
  }

  get columns(): GridColumn[] {
    return this._columns;
  }

  set rows(value: GridRow[] | null | undefined) {
    this._rows = Array.isArray(value) ? value : [];
    this.resetSelectionIfMissing();
    this.clampPage();
    this.renderIfReady();
  }

  get rows(): GridRow[] {
    return this._rows;
  }

  set emptyText(value: string | null | undefined) {
    this._emptyText = value || DEFAULT_EMPTY_TEXT;
    this.setAttribute('empty-text', this._emptyText);
    this.renderIfReady();
  }

  get emptyText(): string {
    return this._emptyText;
  }

  get selectedRow(): GridRow | null {
    return this.getSelectedRow();
  }

  set checkboxSelection(value: boolean | null | undefined) {
    this._checkboxSelection = Boolean(value);
    this.renderIfReady();
  }

  get checkboxSelection(): boolean {
    return this._checkboxSelection;
  }

  set pagination(value: boolean | null | undefined) {
    this._pagination = Boolean(value);
    this.clampPage();
    this.renderIfReady();
  }

  get pagination(): boolean {
    return this._pagination;
  }

  set page(value: number | null | undefined) {
    this.setPage(value || 1);
  }

  get page(): number {
    return this._page;
  }

  set pageSize(value: number | null | undefined) {
    this.setPageSize(value || this._pageSize);
  }

  get pageSize(): number {
    return this._pageSize;
  }

  set virtualScroll(value: boolean | null | undefined) {
    this._virtualScroll = Boolean(value);
    this.renderIfReady();
  }

  get virtualScroll(): boolean {
    return this._virtualScroll;
  }

  set rowHeight(value: number | null | undefined) {
    this._rowHeight = this.normalizePositiveNumber(value || undefined) || DEFAULT_ROW_HEIGHT;
    this.renderIfReady();
  }

  get rowHeight(): number {
    return this._rowHeight;
  }

  setData(rows: GridRow[]): void {
    this.rows = rows;
  }

  setRows(rows: GridRow[]): void {
    this.setData(rows);
  }

  setColumns(columns: GridColumn[]): void {
    this.columns = columns;
  }

  clearSelection(): void {
    if (this._selectedIndex === null && this._checkedRows.size === 0) {
      return;
    }

    this._selectedIndex = null;
    this._checkedRows.clear();
    this.dispatchSelectionChange();
    this.renderIfReady();
  }

  getSelectedRow(): GridRow | null {
    if (this._selectedIndex === null) {
      return null;
    }

    return this.getCurrentRows()[this._selectedIndex] || null;
  }

  getSelectedIndex(): number | null {
    return this.getSelectedRow() ? this._selectedIndex : null;
  }

  getSelectedRows(): GridRow[] {
    const checkedRows = this.getCheckedRows();
    const selectedRow = this.getSelectedRow();

    if (checkedRows.length > 0) {
      return checkedRows;
    }

    return selectedRow ? [selectedRow] : [];
  }

  getCheckedRows(): GridRow[] {
    return this.getSortedRows().filter((row) => this._checkedRows.has(row));
  }

  refresh(): void {
    this.renderIfReady();
  }

  sortBy(field: string, direction: GridSortDirection = 'asc'): void {
    const column = this._columns.find((candidate) => candidate.field === field && candidate.sortable);

    if (!column) {
      return;
    }

    const selectedRow = this.getSelectedRow();
    this._sortState = { field, direction };
    this.restoreSelectedIndex(selectedRow);
    this.dispatchSortChange();
    this.renderIfReady();
  }

  clearSort(): void {
    if (!this._sortState) {
      return;
    }

    const selectedRow = this.getSelectedRow();
    this._sortState = null;
    this.restoreSelectedIndex(selectedRow);
    this.dispatchSortChange();
    this.renderIfReady();
  }

  setPage(page: number): void {
    const previousPage = this._page;
    this._page = this.getClampedPage(page);

    if (previousPage !== this._page) {
      this._selectedIndex = null;
      this.dispatchPageChange();
    }

    this.renderIfReady();
  }

  setPageSize(pageSize: number): void {
    const nextPageSize = this.normalizePositiveNumber(pageSize) || this._pageSize;

    if (nextPageSize === this._pageSize) {
      return;
    }

    this._pageSize = nextPageSize;
    this._page = 1;
    this._selectedIndex = null;
    this.dispatchPageChange();
    this.renderIfReady();
  }

  nextPage(): void {
    this.setPage(this._page + 1);
  }

  previousPage(): void {
    this.setPage(this._page - 1);
  }

  getPageInfo(): GridPageInfo {
    const totalRows = this.getSortedRows().length;
    const totalPages = this.getTotalPages(totalRows);

    return {
      page: this._page,
      pageSize: this._pageSize,
      totalRows,
      totalPages
    };
  }

  exportCsv(options: GridExportOptions = {}): string {
    const includeHeaders = options.includeHeaders !== false;
    const rows = options.rows || this.getSortedRows();
    const lines: string[] = [];

    if (includeHeaders) {
      lines.push(this._columns.map((column) => this.escapeCsvCell(this.sanitizeExportString(column.header))).join(','));
    }

    rows.forEach((row, rowIndex) => {
      lines.push(
        this._columns
          .map((column) => this.escapeCsvCell(this.getExportValue(row, column, rowIndex)))
          .join(',')
      );
    });

    return lines.join('\r\n');
  }

  downloadCsv(fileName = 'hc-grid.csv'): void {
    this.downloadFile(fileName, 'text/csv;charset=utf-8', this.exportCsv({ fileName }));
  }

  exportExcel(options: GridExportOptions = {}): string {
    const includeHeaders = options.includeHeaders !== false;
    const rows = options.rows || this.getSortedRows();
    const head = includeHeaders
      ? `<tr>${this._columns.map((column) => `<th>${escapeHtml(this.sanitizeExportString(column.header))}</th>`).join('')}</tr>`
      : '';
    const body = rows
      .map((row, rowIndex) => {
        const cells = this._columns
          .map((column) => `<td>${escapeHtml(String(this.getExportValue(row, column, rowIndex) ?? ''))}</td>`)
          .join('');
        return `<tr>${cells}</tr>`;
      })
      .join('');

    return [
      '<html>',
      '<head><meta charset="UTF-8" /></head>',
      '<body><table>',
      head,
      body,
      '</table></body>',
      '</html>'
    ].join('');
  }

  downloadExcel(fileName = 'hc-grid.xls'): void {
    this.downloadFile(fileName, 'application/vnd.ms-excel;charset=utf-8', this.exportExcel({ fileName }));
  }

  private render(): void {
    const container = this.getContainer();
    const header = this.getHeader();
    const body = this.getBody();
    const pager = this.getPager();
    const overlay = this.getOverlay();
    const templateColumns = this.getTemplateColumns();

    container.style.setProperty('--hc-grid-row-height', `${this._rowHeight}px`);
    container.setAttribute('aria-rowcount', String(this.getCurrentRows().length));
    container.setAttribute('aria-colcount', String(this._columns.length + (this._checkboxSelection ? 1 : 0)));
    header.style.gridTemplateColumns = templateColumns;

    this.renderHeader(header);
    this.renderBody(body, templateColumns);
    this.renderPager(pager);
    this.renderPopup(overlay);
  }

  private renderPager(pager: HTMLDivElement): void {
    pager.replaceChildren();
    pager.hidden = !this._pagination;

    if (!this._pagination) {
      return;
    }

    const pageInfo = this.getPageInfo();
    const previousButton = document.createElement('button');
    const nextButton = document.createElement('button');
    const status = document.createElement('span');

    previousButton.type = 'button';
    previousButton.className = 'hc-grid__pager-button';
    previousButton.textContent = 'Previous';
    previousButton.disabled = pageInfo.page <= 1;
    previousButton.addEventListener('click', () => {
      this.previousPage();
    });

    nextButton.type = 'button';
    nextButton.className = 'hc-grid__pager-button';
    nextButton.textContent = 'Next';
    nextButton.disabled = pageInfo.page >= pageInfo.totalPages;
    nextButton.addEventListener('click', () => {
      this.nextPage();
    });

    status.className = 'hc-grid__pager-status';
    status.textContent = `Page ${pageInfo.page} / ${pageInfo.totalPages} (${pageInfo.totalRows} rows)`;

    pager.append(previousButton, status, nextButton);
  }

  private renderPopup(overlay: HTMLDivElement): void {
    overlay.replaceChildren();

    if (!this._popup) {
      return;
    }

    const popup = document.createElement('div');
    popup.className = 'hc-grid__popup';
    popup.style.left = `${this._popup.anchor.left}px`;
    popup.style.top = `${this._popup.anchor.top}px`;
    popup.style.minWidth = `${Math.max(this._popup.anchor.width, 160)}px`;
    popup.addEventListener('pointerdown', (event) => {
      event.stopPropagation();
    });
    popup.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    if (this._popup.kind === 'dropdown') {
      this.renderDropdownPopup(popup, this._popup);
    }

    if (this._popup.kind === 'multi-select') {
      this.renderMultiSelectPopup(popup, this._popup);
    }

    overlay.append(popup);
  }

  private renderDropdownPopup(popup: HTMLDivElement, popupState: GridPopupState): void {
    this.getColumnOptions(popupState.column).forEach((option) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'hc-grid__popup-item';
      item.textContent = option.label;
      item.addEventListener('click', () => {
        this.dispatchCellAction(
          popupState.row,
          popupState.rowIndex,
          popupState.column,
          popupState.value,
          String(option.value)
        );
        this.closePopup();
      });
      popup.append(item);
    });
  }

  private renderMultiSelectPopup(popup: HTMLDivElement, popupState: GridPopupState): void {
    const selectedValues = Array.isArray(popupState.row[popupState.column.field])
      ? (popupState.row[popupState.column.field] as unknown[])
      : [];

    this.getColumnOptions(popupState.column).forEach((option) => {
      const label = document.createElement('label');
      const checkbox = document.createElement('input');
      label.className = 'hc-grid__popup-check';
      checkbox.type = 'checkbox';
      checkbox.checked = selectedValues.some((candidate) => Object.is(candidate, option.value));
      checkbox.addEventListener('change', () => {
        const nextValues = checkbox.checked
          ? [...selectedValues, option.value]
          : selectedValues.filter((candidate) => !Object.is(candidate, option.value));
        this.commitControlValue(popupState.row, popupState.rowIndex, popupState.column, nextValues, false);
        this._popup = {
          ...popupState,
          value: nextValues
        };
        this.renderPopup(this.getOverlay());
      });
      label.append(checkbox, document.createTextNode(option.label));
      popup.append(label);
    });
  }

  private renderHeader(header: HTMLDivElement): void {
    header.replaceChildren();

    if (this._checkboxSelection) {
      header.append(this.createHeaderCheckboxCell());
    }

    this._columns.forEach((column, columnIndex) => {
      const cell = document.createElement('div');
      cell.className = this.getCellClassName(column, 'hc-grid__header-cell');
      cell.part.add('header-cell');
      cell.setAttribute('role', 'columnheader');
      cell.setAttribute('aria-colindex', String(columnIndex + 1 + (this._checkboxSelection ? 1 : 0)));
      cell.textContent = column.header;

      if (column.sortable) {
        cell.classList.add('hc-grid__header-cell--sortable');
        cell.part.add('sortable-header-cell');
        cell.dataset.sortable = 'true';
        cell.tabIndex = 0;
        cell.setAttribute('aria-sort', this.getAriaSortValue(column));
        cell.addEventListener('click', () => {
          this.toggleSort(column);
        });
        cell.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleSort(column);
          }
        });

        if (this._sortState?.field === column.field) {
          cell.classList.add(`hc-grid__header-cell--sorted-${this._sortState.direction}`);
        }
      }

      if (column.resizable) {
        cell.classList.add('hc-grid__header-cell--resizable');
        cell.append(this.createResizeHandle(column));
      }

      header.append(cell);
    });
  }

  private createHeaderCheckboxCell(): HTMLDivElement {
    const cell = document.createElement('div');
    const checkbox = document.createElement('input');
    const currentRows = this.getCurrentRows();
    const checkedCount = currentRows.filter((row) => this._checkedRows.has(row)).length;

    cell.className = 'hc-grid__header-cell hc-grid__checkbox-cell';
    cell.part.add('header-cell');
    cell.setAttribute('role', 'columnheader');
    cell.setAttribute('aria-colindex', '1');
    checkbox.type = 'checkbox';
    checkbox.checked = currentRows.length > 0 && checkedCount === currentRows.length;
    checkbox.indeterminate = checkedCount > 0 && checkedCount < currentRows.length;
    checkbox.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleAllCurrentRows(checkbox.checked);
    });
    cell.append(checkbox);

    return cell;
  }

  private renderBody(body: HTMLDivElement, templateColumns: string): void {
    body.replaceChildren();

    const rows = this.getCurrentRows();

    if (rows.length === 0) {
      this.renderEmpty(body);
      return;
    }

    if (!this._virtualScroll) {
      rows.forEach((row, rowIndex) => {
        body.append(this.createRow(row, rowIndex, templateColumns));
      });
      return;
    }

    const container = this.getContainer();
    const visibleCount = Math.max(1, Math.ceil(container.clientHeight / this._rowHeight) + 4);
    const start = Math.max(0, Math.floor(container.scrollTop / this._rowHeight) - 2);
    const end = Math.min(rows.length, start + visibleCount);
    const topSpacer = document.createElement('div');
    const bottomSpacer = document.createElement('div');

    topSpacer.className = 'hc-grid__virtual-spacer';
    topSpacer.style.height = `${start * this._rowHeight}px`;
    bottomSpacer.className = 'hc-grid__virtual-spacer';
    bottomSpacer.style.height = `${(rows.length - end) * this._rowHeight}px`;
    body.append(topSpacer);

    rows.slice(start, end).forEach((row, offset) => {
      body.append(this.createRow(row, start + offset, templateColumns));
    });

    body.append(bottomSpacer);
  }

  private renderEmpty(body: HTMLDivElement): void {
    const empty = document.createElement('div');
    empty.className = 'hc-grid__empty';
    empty.part.add('empty');
    empty.setAttribute('role', 'status');
    empty.textContent = this._emptyText;
    body.append(empty);
  }

  private createRow(row: GridRow, rowIndex: number, templateColumns: string): HTMLDivElement {
    const isSelected = this._selectedIndex === rowIndex;
    const rowElement = document.createElement('div');
    rowElement.className = isSelected ? 'hc-grid__row hc-grid__row--selected' : 'hc-grid__row';
    rowElement.part.add('row');
    rowElement.style.gridTemplateColumns = templateColumns;
    rowElement.setAttribute('role', 'row');
    rowElement.setAttribute('tabindex', '0');
    rowElement.setAttribute('aria-rowindex', String(rowIndex + 1));
    rowElement.setAttribute('aria-selected', String(isSelected));

    if (this._virtualScroll) {
      rowElement.style.minHeight = `${this._rowHeight}px`;
    }

    if (isSelected) {
      rowElement.part.add('selected-row');
    }

    rowElement.addEventListener('click', () => {
      this._selectedIndex = rowIndex;
      const detail: GridRowClickDetail = { row, index: rowIndex };

      this.dispatchEvent(
        new CustomEvent<GridRowClickDetail>('row-click', {
          detail,
          bubbles: true,
          composed: true
        })
      );
      this.render();
    });

    if (this._checkboxSelection) {
      rowElement.append(this.createRowCheckboxCell(row));
    }

    this._columns.forEach((column, columnIndex) => {
      rowElement.append(this.createCell(row, rowIndex, column, columnIndex));
    });

    return rowElement;
  }

  private createRowCheckboxCell(row: GridRow): HTMLDivElement {
    const cell = document.createElement('div');
    const checkbox = document.createElement('input');

    cell.className = 'hc-grid__cell hc-grid__checkbox-cell';
    cell.part.add('cell');
    cell.setAttribute('role', 'gridcell');
    checkbox.type = 'checkbox';
    checkbox.checked = this._checkedRows.has(row);
    checkbox.addEventListener('click', (event) => {
      event.stopPropagation();
      this.toggleRowChecked(row, checkbox.checked);
    });
    cell.append(checkbox);

    return cell;
  }

  private createCell(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    columnIndex: number
  ): HTMLDivElement {
    const cell = document.createElement('div');
    cell.className = this.getCellClassName(column, 'hc-grid__cell');
    cell.part.add('cell');
    cell.setAttribute('role', 'gridcell');
    cell.setAttribute('aria-colindex', String(columnIndex + 1 + (this._checkboxSelection ? 1 : 0)));

    const value = row[column.field];
    const isEditing =
      this._editingCell?.row === row &&
      this._editingCell.column.field === column.field &&
      this._editingCell.rowIndex === rowIndex;

    if (isEditing) {
      cell.append(this.createCellEditor(row, rowIndex, column, value));
    } else if (column.component) {
      cell.classList.add('hc-grid__cell--component');
      cell.append(this.createCellComponent(row, rowIndex, column, value));
    } else {
      this.renderCellValue(cell, row, rowIndex, column);
    }

    cell.addEventListener('click', () => {
      const detail: GridCellClickDetail = {
        row,
        column,
        rowIndex,
        value
      };

      this.dispatchEvent(
        new CustomEvent<GridCellClickDetail>('cell-click', {
          detail,
          bubbles: true,
          composed: true
        })
      );
    });

    if (column.editable) {
      cell.classList.add('hc-grid__cell--editable');
      cell.addEventListener('dblclick', () => {
        this.startEdit(row, rowIndex, column);
      });
    }

    return cell;
  }

  private renderCellValue(cell: HTMLDivElement, row: GridRow, rowIndex: number, column: GridColumn): void {
    const formattedValue = this.getFormattedValue(row, column, rowIndex);
    cell.textContent = formattedValue == null ? '' : String(formattedValue);
  }

  private createCellComponent(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown
  ): HTMLElement {
    if (column.component === 'button') {
      return this.createButtonComponent(row, rowIndex, column, value);
    }

    if (column.component === 'checkbox') {
      return this.createCheckboxComponent(row, rowIndex, column, value);
    }

    if (column.component === 'dropdown-menu') {
      return this.createDropdownMenuComponent(row, rowIndex, column, value);
    }

    if (column.component === 'input') {
      return this.createInputComponent(row, rowIndex, column, value);
    }

    if (column.component === 'select') {
      return this.createSelectComponent(row, rowIndex, column, value, false);
    }

    if (column.component === 'multi-select') {
      return this.createMultiSelectComponent(row, rowIndex, column, value);
    }

    if (column.component === 'badge') {
      return this.createBadgeComponent(row, rowIndex, column);
    }

    const fallback = document.createElement('span');
    fallback.textContent = String(this.getFormattedValue(row, column, rowIndex) ?? '');
    return fallback;
  }

  private createButtonComponent(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown
  ): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'hc-grid__control hc-grid__button';
    button.textContent = column.buttonLabel || String(this.getFormattedValue(row, column, rowIndex) || 'Button');
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      this.dispatchCellAction(row, rowIndex, column, value, 'click');
    });
    return button;
  }

  private createCheckboxComponent(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown
  ): HTMLInputElement {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'hc-grid__control hc-grid__control-checkbox';
    checkbox.checked = Boolean(value);
    checkbox.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    checkbox.addEventListener('change', () => {
      this.commitControlValue(row, rowIndex, column, checkbox.checked);
    });
    return checkbox;
  }

  private createDropdownMenuComponent(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown
  ): HTMLButtonElement {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'hc-grid__control hc-grid__dropdown-trigger';
    trigger.textContent = column.dropdownLabel || String(this.getFormattedValue(row, column, rowIndex) || 'Menu');
    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      this.openPopup('dropdown', row, rowIndex, column, value, trigger);
    });

    return trigger;
  }

  private createInputComponent(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown
  ): HTMLInputElement {
    const input = document.createElement('input');
    input.className = 'hc-grid__control hc-grid__input';
    input.value = value == null ? '' : String(value);
    input.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    input.addEventListener('change', () => {
      this.commitControlValue(row, rowIndex, column, input.value);
    });
    return input;
  }

  private createSelectComponent(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown,
    multiple: boolean
  ): HTMLSelectElement {
    const select = document.createElement('select');
    const values = Array.isArray(value) ? value : [value];
    select.className = multiple ? 'hc-grid__control hc-grid__select hc-grid__select--multiple' : 'hc-grid__control hc-grid__select';
    select.multiple = multiple;

    this.getColumnOptions(column).forEach((option, index) => {
      const item = document.createElement('option');
      item.value = String(index);
      item.textContent = option.label;
      item.selected = values.some((candidate) => Object.is(candidate, option.value));
      select.append(item);
    });

    select.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    select.addEventListener('change', () => {
      const options = this.getColumnOptions(column);
      const nextValue = multiple
        ? Array.from(select.selectedOptions).map((option) => options[Number(option.value)]?.value)
        : options[Number(select.value)]?.value;
      this.commitControlValue(row, rowIndex, column, nextValue);
    });

    return select;
  }

  private createMultiSelectComponent(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown
  ): HTMLButtonElement {
    const trigger = document.createElement('button');
    const selectedValues = Array.isArray(value) ? value : [];
    const selectedLabels = this.getColumnOptions(column)
      .filter((option) => selectedValues.some((candidate) => Object.is(candidate, option.value)))
      .map((option) => option.label);
    trigger.type = 'button';
    trigger.className = 'hc-grid__control hc-grid__multi-select-trigger';
    trigger.textContent = selectedLabels.length > 0 ? selectedLabels.join(', ') : 'Select';
    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      this.openPopup('multi-select', row, rowIndex, column, value, trigger);
    });

    return trigger;
  }

  private createBadgeComponent(row: GridRow, rowIndex: number, column: GridColumn): HTMLSpanElement {
    const badge = document.createElement('span');
    const value = this.getFormattedValue(row, column, rowIndex);
    const variant = String(row[column.field] ?? 'default').toLowerCase().replace(/[^a-z0-9_-]/g, '');
    badge.className = `hc-grid__badge hc-grid__badge--${variant || 'default'}`;
    badge.textContent = value == null ? '' : String(value);
    return badge;
  }

  private openPopup(
    kind: GridPopupState['kind'],
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown,
    anchorElement: HTMLElement
  ): void {
    const rect = anchorElement.getBoundingClientRect();
    const top = Math.min(rect.bottom + 4, window.innerHeight - 12);
    this._popup = {
      kind,
      row,
      column,
      rowIndex,
      value,
      anchor: {
        left: rect.left,
        top,
        width: rect.width
      }
    };
    this.renderPopup(this.getOverlay());
  }

  private closePopup(): void {
    if (!this._popup) {
      return;
    }

    this._popup = null;
    this.renderPopup(this.getOverlay());
  }

  private getColumnOptions(column: GridColumn): GridOption[] {
    return Array.isArray(column.options) ? column.options : [];
  }

  private createCellEditor(row: GridRow, rowIndex: number, column: GridColumn, value: unknown): HTMLInputElement {
    const editor = document.createElement('input');
    editor.className = 'hc-grid__cell-editor';
    editor.value = value == null ? '' : String(value);
    editor.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    editor.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.commitEdit(row, rowIndex, column, editor.value);
      }

      if (event.key === 'Escape') {
        this.cancelEdit();
      }
    });
    editor.addEventListener('blur', () => {
      if (this._editingCell?.row === row && this._editingCell.column.field === column.field) {
        this.commitEdit(row, rowIndex, column, editor.value);
      }
    });
    requestAnimationFrame(() => {
      editor.focus();
      editor.select();
    });

    return editor;
  }

  private startEdit(row: GridRow, rowIndex: number, column: GridColumn): void {
    if (!column.editable) {
      return;
    }

    this._editingCell = { row, rowIndex, column };
    this.render();
  }

  private commitEdit(row: GridRow, rowIndex: number, column: GridColumn, value: unknown): void {
    const oldValue = row[column.field];
    row[column.field] = value;
    this._editingCell = null;

    const detail: GridCellEditDetail = {
      row,
      column,
      rowIndex,
      oldValue,
      value
    };

    this.dispatchEvent(
      new CustomEvent<GridCellEditDetail>('cell-edit', {
        detail,
        bubbles: true,
        composed: true
      })
    );
    this.render();
  }

  private commitControlValue(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown,
    shouldRender = true
  ): void {
    const oldValue = row[column.field];
    row[column.field] = value;

    const detail: GridCellEditDetail = {
      row,
      column,
      rowIndex,
      oldValue,
      value
    };

    this.dispatchEvent(
      new CustomEvent<GridCellEditDetail>('cell-edit', {
        detail,
        bubbles: true,
        composed: true
      })
    );
    if (shouldRender) {
      this.render();
    }
  }

  private dispatchCellAction(
    row: GridRow,
    rowIndex: number,
    column: GridColumn,
    value: unknown,
    action: string
  ): void {
    const detail: GridCellActionDetail = {
      row,
      column,
      rowIndex,
      value,
      action
    };

    this.dispatchEvent(
      new CustomEvent<GridCellActionDetail>('cell-action', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private cancelEdit(): void {
    this._editingCell = null;
    this.render();
  }

  private toggleSort(column: GridColumn): void {
    if (!column.sortable) {
      return;
    }

    const selectedRow = this.getSelectedRow();

    if (!this._sortState || this._sortState.field !== column.field) {
      this._sortState = { field: column.field, direction: 'asc' };
    } else if (this._sortState.direction === 'asc') {
      this._sortState = { field: column.field, direction: 'desc' };
    } else {
      this._sortState = null;
    }

    this.restoreSelectedIndex(selectedRow);
    this.dispatchSortChange();
    this.render();
  }

  private toggleRowChecked(row: GridRow, checked: boolean): void {
    if (checked) {
      this._checkedRows.add(row);
    } else {
      this._checkedRows.delete(row);
    }

    this.dispatchSelectionChange();
    this.render();
  }

  private toggleAllCurrentRows(checked: boolean): void {
    this.getCurrentRows().forEach((row) => {
      if (checked) {
        this._checkedRows.add(row);
      } else {
        this._checkedRows.delete(row);
      }
    });

    this.dispatchSelectionChange();
    this.render();
  }

  private getCurrentRows(): GridRow[] {
    const sortedRows = this.getSortedRows();

    if (!this._pagination) {
      return sortedRows;
    }

    const start = (this._page - 1) * this._pageSize;
    return sortedRows.slice(start, start + this._pageSize);
  }

  private getSortedRows(): GridRow[] {
    if (!this._sortState) {
      return this._rows;
    }

    const { field, direction } = this._sortState;
    const directionFactor = direction === 'asc' ? 1 : -1;

    return this._rows
      .map((row, index) => ({ row, index }))
      .sort((left, right) => {
        const result = this.compareValues(left.row[field], right.row[field]);
        return result === 0 ? left.index - right.index : result * directionFactor;
      })
      .map((entry) => entry.row);
  }

  private getFormattedValue(row: GridRow, column: GridColumn, rowIndex: number): unknown {
    const value = row[column.field];

    if (!column.formatter) {
      return value;
    }

    return column.formatter(value, row, column, rowIndex);
  }

  private compareValues(left: unknown, right: unknown): number {
    if (left == null && right == null) {
      return 0;
    }

    if (left == null) {
      return 1;
    }

    if (right == null) {
      return -1;
    }

    if (typeof left === 'number' && typeof right === 'number') {
      return left - right;
    }

    return String(left).localeCompare(String(right), undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  }

  private dispatchSortChange(): void {
    const detail: GridSortChangeDetail = {
      sortState: this._sortState
    };

    this.dispatchEvent(
      new CustomEvent<GridSortChangeDetail>('sort-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private dispatchSelectionChange(): void {
    const detail: GridSelectionChangeDetail = {
      rows: this.getCheckedRows()
    };

    this.dispatchEvent(
      new CustomEvent<GridSelectionChangeDetail>('selection-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private dispatchPageChange(): void {
    const detail: GridPageChangeDetail = this.getPageInfo();

    this.dispatchEvent(
      new CustomEvent<GridPageChangeDetail>('page-change', {
        detail,
        bubbles: true,
        composed: true
      })
    );
  }

  private getAriaSortValue(column: GridColumn): 'ascending' | 'descending' | 'none' {
    if (this._sortState?.field !== column.field) {
      return 'none';
    }

    return this._sortState.direction === 'asc' ? 'ascending' : 'descending';
  }

  private getCellClassName(column: GridColumn, baseClassName: string): string {
    const classNames = [baseClassName];

    if (column.align === 'center') {
      classNames.push('hc-grid__cell--center');
    }

    if (column.align === 'right') {
      classNames.push('hc-grid__cell--right');
    }

    return classNames.join(' ');
  }

  private getTemplateColumns(): string {
    const tracks = this._columns.map((column) => this.getColumnTrack(column));

    if (this._checkboxSelection) {
      tracks.unshift(`${CHECKBOX_COLUMN_WIDTH}px`);
    }

    return tracks.length > 0 ? tracks.join(' ') : 'minmax(160px, 1fr)';
  }

  private getColumnTrack(column: GridColumn): string {
    const resizedWidth = this._columnWidths.get(column.field);
    const width = resizedWidth || this.normalizePositiveNumber(column.width);
    const minWidth = this.normalizePositiveNumber(column.minWidth);

    if (width && minWidth) {
      return `minmax(${minWidth}px, ${Math.max(width, minWidth)}px)`;
    }

    if (width) {
      return `${width}px`;
    }

    if (minWidth) {
      return `minmax(${minWidth}px, 1fr)`;
    }

    return 'minmax(120px, 1fr)';
  }

  private createResizeHandle(column: GridColumn): HTMLSpanElement {
    const handle = document.createElement('span');
    handle.className = 'hc-grid__resize-handle';
    handle.addEventListener('click', (event) => {
      event.stopPropagation();
    });
    handle.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const currentWidth = this._columnWidths.get(column.field) || column.width || 120;
      this._resizeState = {
        field: column.field,
        startX: event.clientX,
        startWidth: currentWidth
      };
      handle.setPointerCapture(event.pointerId);
    });
    handle.addEventListener('pointermove', (event) => {
      if (!this._resizeState || this._resizeState.field !== column.field) {
        return;
      }

      const minWidth = this.normalizePositiveNumber(column.minWidth) || 48;
      const nextWidth = Math.max(minWidth, this._resizeState.startWidth + event.clientX - this._resizeState.startX);
      this._columnWidths.set(column.field, nextWidth);
      this.render();
    });
    handle.addEventListener('pointerup', () => {
      this._resizeState = null;
    });
    handle.addEventListener('pointercancel', () => {
      this._resizeState = null;
    });

    return handle;
  }

  private getTotalPages(totalRows = this.getSortedRows().length): number {
    return Math.max(1, Math.ceil(totalRows / this._pageSize));
  }

  private getClampedPage(page: number): number {
    const safePage = Math.trunc(this.normalizePositiveNumber(page) || 1);
    return Math.min(Math.max(1, safePage), this.getTotalPages());
  }

  private clampPage(): void {
    this._page = this.getClampedPage(this._page);
  }

  private normalizePositiveNumber(value: number | undefined): number | null {
    return typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : null;
  }

  private resetSortIfColumnMissing(): void {
    if (!this._sortState) {
      return;
    }

    const sortedColumnExists = this._columns.some(
      (column) => column.field === this._sortState?.field && column.sortable
    );

    if (!sortedColumnExists) {
      this._sortState = null;
    }
  }

  private resetSelectionIfMissing(): void {
    this._checkedRows.forEach((row) => {
      if (!this._rows.includes(row)) {
        this._checkedRows.delete(row);
      }
    });

    if (this._selectedIndex !== null && this._selectedIndex >= this.getCurrentRows().length) {
      this._selectedIndex = null;
    }
  }

  private restoreSelectedIndex(selectedRow: GridRow | null): void {
    if (!selectedRow) {
      this._selectedIndex = null;
      return;
    }

    const nextIndex = this.getCurrentRows().indexOf(selectedRow);
    this._selectedIndex = nextIndex >= 0 ? nextIndex : null;
  }

  private syncAttributes(): void {
    this.getContainer().style.setProperty('--hc-grid-height', this.getAttribute('height') || 'none');
    this._emptyText = this.getAttribute('empty-text') || this._emptyText;
  }

  private renderIfReady(): void {
    if (this._isConnected) {
      this.render();
    }
  }

  private upgradeProperty(
    propertyName:
      | 'columns'
      | 'rows'
      | 'emptyText'
      | 'checkboxSelection'
      | 'pagination'
      | 'page'
      | 'pageSize'
      | 'virtualScroll'
      | 'rowHeight'
  ): void {
    if (!Object.prototype.hasOwnProperty.call(this, propertyName)) {
      return;
    }

    const value = this[propertyName];
    delete this[propertyName];
    this[propertyName] = value as never;
  }

  private escapeCsvCell(value: unknown): string {
    const cell = value == null ? '' : String(value);

    if (/[",\r\n]/.test(cell)) {
      return `"${cell.replace(/"/g, '""')}"`;
    }

    return cell;
  }

  private getExportValue(row: GridRow, column: GridColumn, rowIndex: number): unknown {
    const value = this.getFormattedValue(row, column, rowIndex);

    if (typeof value === 'string') {
      return this.sanitizeExportString(value);
    }

    return value;
  }

  private sanitizeExportString(value: string): string {
    return /^[=+\-@]/.test(value) ? `'${value}` : value;
  }

  private downloadFile(fileName: string, type: string, content: string): void {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  private getContainer(): HTMLDivElement {
    return this.shadow.querySelector('.hc-grid') as HTMLDivElement;
  }

  private getHeader(): HTMLDivElement {
    return this.shadow.querySelector('.hc-grid__header') as HTMLDivElement;
  }

  private getBody(): HTMLDivElement {
    return this.shadow.querySelector('.hc-grid__body') as HTMLDivElement;
  }

  private getPager(): HTMLDivElement {
    return this.shadow.querySelector('.hc-grid__pager') as HTMLDivElement;
  }

  private getOverlay(): HTMLDivElement {
    return this.shadow.querySelector('.hc-grid__overlay') as HTMLDivElement;
  }
}

export { HcGrid as HcGridElement };
