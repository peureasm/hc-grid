# HighColor Grid

Framework agnostic Data Grid library based on Web Components, Custom Elements, Shadow DOM, CSS Variables, TypeScript, and Vite Library Mode.

## Install

```bash
npm install @highcolor/grid
```

## Basic Usage

```html
<script type="module" src="/dist/hc-grid.es.js"></script>

<hc-grid id="userGrid"></hc-grid>

<script>
  const grid = document.querySelector('#userGrid');

  grid.columns = [
    { field: 'name', header: '이름', width: 120, sortable: true, resizable: true },
    { field: 'age', header: '나이', width: 80, align: 'center' },
    { field: 'email', header: '이메일', minWidth: 220, editable: true }
  ];

  grid.rows = [
    { name: '홍길동', age: 32, email: 'hong@test.com' },
    { name: '김철수', age: 41, email: 'kim@test.com' }
  ];

  grid.addEventListener('row-click', (event) => {
    console.log(event.detail);
  });
</script>
```

## Column Options

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

## View Modes

The same `rows` and `columns` can be rendered as a table or as cards.

```js
grid.viewMode = 'card';
grid.cardTitleField = 'name';
grid.cardSubtitleField = 'memo';
```

- `viewMode`: `'table' | 'card'`
- `cardTitleField`: field used as the card title
- `cardSubtitleField`: optional field used as the card subtitle
- `cardRenderer`: optional function that returns a custom `Node` or safe text for each card

```js
grid.cardRenderer = ({ row }) => {
  const card = document.createElement('div');
  const title = document.createElement('strong');
  title.textContent = row.name;
  card.append(title);
  return card;
};
```

`cardRenderer` context also provides `checked` and `toggleChecked()` so custom card layouts can place their own selection checkbox.

## Data

```ts
type GridRow = Record<string, unknown>;
```

Use property injection as the default integration style.

```js
grid.columns = columns;
grid.rows = rows;
```

## v1 Features

- Basic rendering with empty state
- Sorting: `none -> asc -> desc -> none`
- Row click selection
- Checkbox multi-selection: `checkboxSelection = true`
- Column resize: `resizable: true`
- Cell formatter: `formatter`
- Pagination: `pagination`, `page`, `pageSize`, `pageSizeOptions`
- Virtual scroll: `virtualScroll`, `rowHeight`
- Cell editing: `editable: true`
- CSV / Excel export: `exportCsv()`, `downloadCsv()`, `exportExcel()`, `downloadExcel()`

See `docs/features.md` for the current feature record.

## Events

All events are `CustomEvent` instances with `{ bubbles: true, composed: true }`.

| Event | detail |
| --- | --- |
| `row-click` | `{ row, index }` |
| `cell-click` | `{ row, column, rowIndex, value }` |
| `sort-change` | `{ sortState }` |
| `selection-change` | `{ rows }` |
| `cell-edit` | `{ row, column, rowIndex, oldValue, value }` |
| `cell-action` | `{ row, column, rowIndex, value, action }` |
| `page-change` | `{ page, pageSize, pageSizeOptions, totalRows, totalPages }` |

When `pagination` is `true`, HC Grid renders a built-in pager below the grid with a page-size select box, Previous/Next buttons, and page status.

## Methods

| Method | Description |
| --- | --- |
| `setData(rows)` | Set row data. |
| `setColumns(columns)` | Set column definitions. |
| `clearSelection()` | Clear row and checkbox selection. |
| `getSelectedRow()` | Return clicked row or `null`. |
| `getSelectedIndex()` | Return clicked row index or `null`. |
| `getSelectedRows()` | Return checked rows or clicked row. |
| `getCheckedRows()` | Return checkbox-selected rows. |
| `refresh()` | Force render. |
| `sortBy(field, direction)` | Sort a sortable column. |
| `clearSort()` | Clear sort state. |
| `setPage(page)` | Move to page. |
| `setPageSize(pageSize)` | Change page size. |
| `nextPage()` | Move to next page. |
| `previousPage()` | Move to previous page. |
| `getPageInfo()` | Return page metadata. |
| `exportCsv(options)` | Return CSV text. |
| `downloadCsv(fileName)` | Download CSV. |
| `exportExcel(options)` | Return Excel-compatible HTML. |
| `downloadExcel(fileName)` | Download `.xls`. |

## Theming

Shadow DOM styles can be themed with CSS variables.

```css
hc-grid {
  --hc-grid-font-family: system-ui, sans-serif;
  --hc-grid-bg: #ffffff;
  --hc-grid-text-color: #172033;
  --hc-grid-border-color: #d7dce5;
  --hc-grid-radius: 16px;
  --hc-grid-header-bg: #111827;
  --hc-grid-header-text-color: #ffffff;
  --hc-grid-header-hover-bg: #1f2937;
  --hc-grid-row-hover-bg: #f8fbff;
  --hc-grid-selected-bg: #fff7ed;
  --hc-grid-empty-text-color: #7b8494;
}
```

## Vanilla HTML

```html
<script type="module" src="./dist/hc-grid.es.js"></script>
<hc-grid id="grid" height="320px"></hc-grid>

<script>
  const grid = document.querySelector('#grid');

  grid.checkboxSelection = true;
  grid.pagination = true;
  grid.pageSize = 2;
  grid.pageSizeOptions = [2, 5, 10, 20];

  grid.setColumns([
    { field: 'name', header: '이름', width: 120, sortable: true, resizable: true },
    { field: 'age', header: '나이', width: 80, formatter: (value) => `${value}세` }
  ]);

  grid.setData([
    { name: '홍길동', age: 32 },
    { name: '김철수', age: 41 }
  ]);
</script>
```

## CRUD Example

Open `examples/crud.html` to try query, create, read selected, update, and delete flows with `setData()`, `getSelectedRow()`, `getCheckedRows()`, `clearSelection()`, `cell-edit`, and `cell-action`.

## Firebase CRUD Example

Run the Vite dev server and open the Firestore CRUD page:

```bash
npm run dev
```

```text
http://localhost:5173/examples/firebase-crud.html
```

The page uses real Firestore data. It reads Firebase config from `VITE_FIREBASE_*` values in `.env.local` and also lets you paste config JSON in the browser. Use a real collection path, then test `Load`, `Realtime`, `Create`, `Set`, `Update`, `Delete`, row selection, checkbox deletion, and direct cell edit writes.

## React

```tsx
import { useEffect, useRef } from 'react';
import '@highcolor/grid';

export function UserGrid() {
  const gridRef = useRef<any>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.columns = [
      { field: 'name', header: '이름', width: 120 },
      { field: 'age', header: '나이', width: 80, sortable: true }
    ];
    grid.rows = [
      { name: '홍길동', age: 32 },
      { name: '김철수', age: 41 }
    ];
  }, []);

  return <hc-grid ref={gridRef}></hc-grid>;
}
```

## Vue

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import '@highcolor/grid';

const gridRef = ref<any>(null);

onMounted(() => {
  const grid = gridRef.value;
  if (!grid) return;

  grid.columns = [
    { field: 'name', header: '이름', width: 120 },
    { field: 'age', header: '나이', width: 80, sortable: true }
  ];
  grid.rows = [
    { name: '홍길동', age: 32 },
    { name: '김철수', age: 41 }
  ];
});
</script>

<template>
  <hc-grid ref="gridRef" />
</template>
```

## Build

```bash
npm install
npm run typecheck
npm run build
```

Build output:

- `dist/hc-grid.es.js`
- `dist/hc-grid.umd.js`
- `dist/index.d.ts`
