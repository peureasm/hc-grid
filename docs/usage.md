# Usage

## Vanilla HTML

```html
<script type="module" src="/dist/hc-grid.es.js"></script>

<hc-grid id="userGrid" height="360px"></hc-grid>

<script>
  const grid = document.querySelector('#userGrid');

  grid.checkboxSelection = true;
  grid.pagination = true;
  grid.pageSize = 2;
  grid.pageSizeOptions = [2, 5, 10, 20];
  grid.virtualScroll = true;
  grid.viewMode = 'table';
  grid.cardTitleField = 'name';

  grid.columns = [
    { field: 'name', header: '이름', width: 120, sortable: true, resizable: true },
    { field: 'age', header: '나이', width: 80, align: 'center', formatter: (value) => `${value}세` },
    { field: 'email', header: '이메일', minWidth: 220, editable: true }
  ];

  grid.rows = [
    { name: '홍길동', age: 32, email: 'hong@test.com' },
    { name: '김철수', age: 41, email: 'kim@test.com' }
  ];
</script>
```

`pagination = true` displays the built-in pager below the grid. Use `pageSizeOptions` to control the page-size select box, and use a small `pageSize` while testing to see page changes immediately.

Switch to card view when each row should be displayed as one card:

```js
grid.viewMode = 'card';
grid.cardTitleField = 'name';
grid.cardSubtitleField = 'email';
```

## CRUD Example

`examples/crud.html` shows query, create, read selected, update, and delete flows using the public grid API.

## Events

```js
grid.addEventListener('row-click', (event) => {
  console.log(event.detail.row, event.detail.index);
});

grid.addEventListener('selection-change', (event) => {
  console.log(event.detail.rows);
});

grid.addEventListener('cell-edit', (event) => {
  console.log(event.detail.row, event.detail.column, event.detail.oldValue, event.detail.value);
});

grid.addEventListener('page-change', (event) => {
  console.log(event.detail);
});
```

## Export

```js
const csv = grid.exportCsv();
const excel = grid.exportExcel();

grid.downloadCsv('users.csv');
grid.downloadExcel('users.xls');
```
