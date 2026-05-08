# Roadmap

## v0.1 Basic Grid

Implemented. Supports property-based `columns` and `rows`, header/body rendering, empty state, sorting, row click selection, events, Shadow DOM styles, and CSS variables.

## v0.2 Checkbox Selection

Implemented. `checkboxSelection` adds row checkboxes and a header checkbox. Use `getCheckedRows()`, `getSelectedRows()`, and `selection-change`.

## v0.3 Column Resize

Implemented. Set `resizable: true` on a column to enable pointer-based header resizing. Resized widths are tracked by column `field`.

## v0.4 Cell Formatter

Implemented. Set `formatter` on a column to customize display and export values without using `innerHTML`.

## v0.5 Pagination

Implemented. Use `pagination`, `page`, `pageSize`, `setPage()`, `setPageSize()`, `nextPage()`, `previousPage()`, `getPageInfo()`, and `page-change`.

## v0.6 Virtual Scroll

Implemented. Use `virtualScroll` and `rowHeight` to render only visible rows for large datasets.

## v0.7 Cell Editing

Implemented. Set `editable: true` on a column, double-click a cell, and listen for `cell-edit`.

## v0.8 CSV / Excel Export

Implemented. Use `exportCsv()`, `downloadCsv()`, `exportExcel()`, and `downloadExcel()`.

## v1.0 Stable API

Implemented. Public properties, methods, events, CSS variables, and TypeScript declarations are documented in README and `docs/api.md`.
