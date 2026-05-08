# API

`<hc-grid>` is a framework agnostic Web Component Custom Element. Importing the package entry registers `hc-grid` automatically.

## Properties

| Property | Type | Description |
| --- | --- | --- |
| `columns` | `GridColumn[]` | Column definitions. |
| `rows` | `GridRow[]` | Row data. |
| `emptyText` | `string` | Empty-state text. |
| `checkboxSelection` | `boolean` | Enables checkbox multi-selection. |
| `pagination` | `boolean` | Enables client-side pagination and shows the built-in pager. |
| `page` | `number` | Current page. Starts at `1`. |
| `pageSize` | `number` | Rows per page. |
| `virtualScroll` | `boolean` | Renders only visible rows. |
| `rowHeight` | `number` | Virtual row height in pixels. |
| `selectedRow` | `GridRow \| null` | Currently clicked row. Read-only getter. |

## Column

```ts
type GridColumn = {
  field: string;
  header: string;
  width?: number;
  minWidth?: number;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  resizable?: boolean;
  editable?: boolean;
  formatter?: (value: unknown, row: GridRow, column: GridColumn, rowIndex: number) => unknown;
  component?: 'button' | 'checkbox' | 'dropdown-menu' | 'input' | 'select' | 'multi-select' | 'badge';
  options?: { label: string; value: unknown }[];
  buttonLabel?: string;
  dropdownLabel?: string;
};
```

`component` renders safe built-in cell controls inside the grid. `select`, `multi-select`, and `dropdown-menu` use `options`.

## Methods

| Method | Description |
| --- | --- |
| `setData(rows)` | Sets row data and renders. |
| `setRows(rows)` | Alias for `setData(rows)`. |
| `setColumns(columns)` | Sets column definitions and renders. |
| `clearSelection()` | Clears clicked-row and checkbox selections. |
| `getSelectedRow()` | Returns the clicked row, or `null`. |
| `getSelectedIndex()` | Returns the clicked row index in the current view, or `null`. |
| `getSelectedRows()` | Returns checked rows, or the clicked row as a single-item array. |
| `getCheckedRows()` | Returns checkbox-selected rows. |
| `refresh()` | Forces a render. |
| `sortBy(field, direction)` | Sorts a sortable column by `asc` or `desc`. |
| `clearSort()` | Clears active sort. |
| `setPage(page)` | Moves to a page. |
| `setPageSize(pageSize)` | Changes page size and moves to page `1`. |
| `nextPage()` | Moves to the next page. |
| `previousPage()` | Moves to the previous page. |
| `getPageInfo()` | Returns `{ page, pageSize, totalRows, totalPages }`. |
| `exportCsv(options)` | Returns CSV text. |
| `downloadCsv(fileName)` | Downloads CSV. |
| `exportExcel(options)` | Returns Excel-compatible HTML table text. |
| `downloadExcel(fileName)` | Downloads Excel-compatible `.xls`. |

## Events

All events are `CustomEvent` instances dispatched with `{ bubbles: true, composed: true }`.

| Event | detail |
| --- | --- |
| `row-click` | `{ row, index }` |
| `cell-click` | `{ row, column, rowIndex, value }` |
| `sort-change` | `{ sortState }` |
| `selection-change` | `{ rows }` |
| `cell-edit` | `{ row, column, rowIndex, oldValue, value }` |
| `cell-action` | `{ row, column, rowIndex, value, action }` |
| `page-change` | `{ page, pageSize, totalRows, totalPages }` |

## Pagination Example

When `pagination` is `true`, HC Grid renders a built-in pager below the grid with Previous/Next buttons and page status.

```js
const grid = document.querySelector('hc-grid');

grid.pagination = true;
grid.pageSize = 2;

grid.columns = [
  { field: 'name', header: 'Name', width: 120 },
  { field: 'age', header: 'Age', width: 80, align: 'center' }
];

grid.rows = [
  { name: 'Hong', age: 32 },
  { name: 'Kim', age: 41 },
  { name: 'Lee', age: 29 }
];

grid.addEventListener('page-change', (event) => {
  console.log(event.detail);
});
```
