var f = Object.defineProperty;
var x = (l, g, e) => g in l ? f(l, g, { enumerable: !0, configurable: !0, writable: !0, value: e }) : l[g] = e;
var d = (l, g, e) => x(l, typeof g != "symbol" ? g + "" : g, e);
const v = `
  :host {
    --hc-grid-font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --hc-grid-bg: #fff;
    --hc-grid-text-color: #1f2937;
    --hc-grid-border-color: #d8dee8;
    --hc-grid-radius: 6px;
    --hc-grid-header-bg: #f4f7fb;
    --hc-grid-header-text-color: #18202f;
    --hc-grid-header-hover-bg: #e9eef7;
    --hc-grid-row-hover-bg: #eef6ff;
    --hc-grid-selected-bg: #dbeafe;
    --hc-grid-empty-text-color: #657085;
    --hc-grid-focus: #2563eb;
    display: block;
    box-sizing: border-box;
    color: var(--hc-grid-text-color);
    font-family: var(--hc-grid-font-family);
    font-size: 14px;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  .hc-grid {
    border: 1px solid var(--hc-grid-border-color);
    border-radius: var(--hc-grid-radius);
    background: var(--hc-grid-bg);
    overflow: auto;
    min-height: 84px;
    max-height: var(--hc-grid-height, none);
  }

  .hc-grid__header,
  .hc-grid__row {
    display: grid;
    min-width: max-content;
  }

  .hc-grid__header {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--hc-grid-header-bg);
    color: var(--hc-grid-header-text-color);
    font-weight: 700;
    border-bottom: 1px solid var(--hc-grid-border-color);
  }

  .hc-grid__body {
    min-width: max-content;
  }

  .hc-grid__row {
    border-bottom: 1px solid var(--hc-grid-border-color);
  }

  .hc-grid__row:last-child {
    border-bottom: 0;
  }

  .hc-grid__row:hover {
    background: var(--hc-grid-row-hover-bg);
  }

  .hc-grid__row--selected,
  .hc-grid__row--selected:hover {
    background: var(--hc-grid-selected-bg);
  }

  .hc-grid__row:focus-visible {
    outline: 2px solid var(--hc-grid-focus);
    outline-offset: -2px;
  }

  .hc-grid__cell,
  .hc-grid__header-cell {
    position: relative;
    min-width: 0;
    padding: 10px 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hc-grid__header-cell {
    user-select: none;
  }

  .hc-grid__header-cell:hover {
    background: var(--hc-grid-header-hover-bg);
  }

  .hc-grid__header-cell--sortable {
    cursor: pointer;
  }

  .hc-grid__header-cell--resizable {
    padding-right: 18px;
  }

  .hc-grid__resize-handle {
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 100%;
    cursor: col-resize;
    touch-action: none;
  }

  .hc-grid__resize-handle::after {
    content: "";
    position: absolute;
    top: 20%;
    right: 3px;
    width: 1px;
    height: 60%;
    background: var(--hc-grid-border-color);
  }

  .hc-grid__header-cell--sortable::after {
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 6px;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid currentColor;
    opacity: 0.42;
    vertical-align: middle;
  }

  .hc-grid__header-cell--sorted-asc::after {
    border-top: 0;
    border-bottom: 5px solid currentColor;
    opacity: 0.9;
  }

  .hc-grid__header-cell--sorted-desc::after {
    opacity: 0.9;
  }

  .hc-grid__cell--center {
    text-align: center;
  }

  .hc-grid__cell--right {
    text-align: right;
  }

  .hc-grid__cell--editable {
    cursor: text;
  }

  .hc-grid__cell--component {
    overflow: visible;
    text-overflow: clip;
  }

  .hc-grid__cell-editor {
    width: 100%;
    min-width: 0;
    border: 1px solid var(--hc-grid-focus);
    border-radius: 4px;
    padding: 4px 6px;
    color: var(--hc-grid-text-color);
    background: var(--hc-grid-bg);
    font: inherit;
  }

  .hc-grid__checkbox-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .hc-grid__checkbox-cell input {
    width: 16px;
    height: 16px;
    margin: 0;
  }

  .hc-grid__control {
    min-width: 0;
    border: 1px solid var(--hc-grid-border-color);
    border-radius: 6px;
    background: var(--hc-grid-bg);
    color: var(--hc-grid-text-color);
    font: inherit;
  }

  .hc-grid__button {
    min-height: 28px;
    padding: 0 10px;
    cursor: pointer;
  }

  .hc-grid__button:hover {
    background: var(--hc-grid-row-hover-bg);
  }

  .hc-grid__input,
  .hc-grid__select {
    width: 100%;
    min-height: 28px;
    padding: 0 8px;
  }

  .hc-grid__multi-select-trigger {
    width: 100%;
    min-height: 28px;
    padding: 0 8px;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .hc-grid__control-checkbox {
    width: 16px;
    height: 16px;
    margin: 0;
  }

  .hc-grid__dropdown-trigger {
    display: inline-flex;
    align-items: center;
    width: 100%;
    min-height: 28px;
    border: 1px solid var(--hc-grid-border-color);
    border-radius: 6px;
    padding: 0 10px;
    background: var(--hc-grid-bg);
    cursor: pointer;
    list-style: none;
  }

  .hc-grid__dropdown-trigger::-webkit-details-marker {
    display: none;
  }

  .hc-grid__overlay {
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
  }

  .hc-grid__popup {
    position: fixed;
    max-height: min(280px, calc(100vh - 24px));
    overflow: auto;
    border: 1px solid var(--hc-grid-border-color);
    border-radius: 6px;
    padding: 4px;
    background: var(--hc-grid-bg);
    box-shadow: 0 10px 24px rgb(15 23 42 / 14%);
    pointer-events: auto;
  }

  .hc-grid__popup-item {
    display: block;
    width: 100%;
    border: 0;
    border-radius: 4px;
    padding: 7px 8px;
    background: transparent;
    color: var(--hc-grid-text-color);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .hc-grid__popup-item:hover {
    background: var(--hc-grid-row-hover-bg);
  }

  .hc-grid__popup-check {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 4px;
    padding: 7px 8px;
    cursor: pointer;
  }

  .hc-grid__popup-check:hover {
    background: var(--hc-grid-row-hover-bg);
  }

  .hc-grid__popup-check input {
    width: 16px;
    height: 16px;
    margin: 0;
  }

  .hc-grid__badge {
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    border-radius: 999px;
    padding: 0 9px;
    background: var(--hc-grid-row-hover-bg);
    color: var(--hc-grid-text-color);
    font-size: 12px;
    font-weight: 700;
  }

  .hc-grid__badge--active,
  .hc-grid__badge--success {
    background: #dcfce7;
    color: #166534;
  }

  .hc-grid__badge--pending,
  .hc-grid__badge--warning {
    background: #fef3c7;
    color: #92400e;
  }

  .hc-grid__badge--blocked,
  .hc-grid__badge--danger {
    background: #fee2e2;
    color: #991b1b;
  }

  .hc-grid__virtual-spacer {
    min-width: 100%;
  }

  .hc-grid__empty {
    min-width: 100%;
    padding: 28px 16px;
    color: var(--hc-grid-empty-text-color);
    text-align: center;
  }

  .hc-grid__pager {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px 0 0;
    color: var(--hc-grid-text-color);
  }

  .hc-grid__pager[hidden] {
    display: none;
  }

  .hc-grid__pager-button {
    min-width: 76px;
    border: 1px solid var(--hc-grid-border-color);
    border-radius: 6px;
    padding: 6px 10px;
    background: var(--hc-grid-bg);
    color: var(--hc-grid-text-color);
    font: inherit;
    cursor: pointer;
  }

  .hc-grid__pager-button:hover:not(:disabled) {
    background: var(--hc-grid-row-hover-bg);
  }

  .hc-grid__pager-button:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }

  .hc-grid__pager-status {
    min-width: 140px;
    text-align: center;
    color: var(--hc-grid-empty-text-color);
  }
`, w = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
};
function m(l) {
  return String(l ?? "").replace(/[&<>"']/g, (g) => w[g]);
}
const u = "No data", C = 44, b = 40;
class y extends HTMLElement {
  constructor() {
    super();
    d(this, "_columns", []);
    d(this, "_rows", []);
    d(this, "_sortState", null);
    d(this, "_selectedIndex", null);
    d(this, "shadow");
    d(this, "_emptyText", u);
    d(this, "_isConnected", !1);
    d(this, "_checkboxSelection", !1);
    d(this, "_checkedRows", /* @__PURE__ */ new Set());
    d(this, "_columnWidths", /* @__PURE__ */ new Map());
    d(this, "_pagination", !1);
    d(this, "_page", 1);
    d(this, "_pageSize", 20);
    d(this, "_virtualScroll", !1);
    d(this, "_rowHeight", b);
    d(this, "_editingCell", null);
    d(this, "_resizeState", null);
    d(this, "_popup", null);
    d(this, "handleDocumentPointerDown", (e) => {
      e.composedPath().includes(this) || this.closePopup();
    });
    this.shadow = this.attachShadow({ mode: "open" }), this.shadow.innerHTML = `
      <style>${v}</style>
      <div class="hc-grid" part="container" role="grid">
        <div class="hc-grid__header" part="header" role="row"></div>
        <div class="hc-grid__body" part="body"></div>
      </div>
      <div class="hc-grid__pager" part="pager" hidden></div>
      <div class="hc-grid__overlay" part="overlay"></div>
    `, this.getContainer().addEventListener("scroll", () => {
      this._virtualScroll && this.renderBody(this.getBody(), this.getTemplateColumns()), this.closePopup();
    });
  }
  static get observedAttributes() {
    return ["height", "empty-text"];
  }
  connectedCallback() {
    this.upgradeProperty("columns"), this.upgradeProperty("rows"), this.upgradeProperty("emptyText"), this.upgradeProperty("checkboxSelection"), this.upgradeProperty("pagination"), this.upgradeProperty("page"), this.upgradeProperty("pageSize"), this.upgradeProperty("virtualScroll"), this.upgradeProperty("rowHeight"), this._isConnected = !0, this.syncAttributes(), this.render(), document.addEventListener("pointerdown", this.handleDocumentPointerDown);
  }
  disconnectedCallback() {
    document.removeEventListener("pointerdown", this.handleDocumentPointerDown);
  }
  attributeChangedCallback(e) {
    e === "empty-text" && (this._emptyText = this.getAttribute("empty-text") || u), this._isConnected && (this.syncAttributes(), this.render());
  }
  set columns(e) {
    this._columns = Array.isArray(e) ? e : [], this.resetSortIfColumnMissing(), this.renderIfReady();
  }
  get columns() {
    return this._columns;
  }
  set rows(e) {
    this._rows = Array.isArray(e) ? e : [], this.resetSelectionIfMissing(), this.clampPage(), this.renderIfReady();
  }
  get rows() {
    return this._rows;
  }
  set emptyText(e) {
    this._emptyText = e || u, this.setAttribute("empty-text", this._emptyText), this.renderIfReady();
  }
  get emptyText() {
    return this._emptyText;
  }
  get selectedRow() {
    return this.getSelectedRow();
  }
  set checkboxSelection(e) {
    this._checkboxSelection = !!e, this.renderIfReady();
  }
  get checkboxSelection() {
    return this._checkboxSelection;
  }
  set pagination(e) {
    this._pagination = !!e, this.clampPage(), this.renderIfReady();
  }
  get pagination() {
    return this._pagination;
  }
  set page(e) {
    this.setPage(e || 1);
  }
  get page() {
    return this._page;
  }
  set pageSize(e) {
    this.setPageSize(e || this._pageSize);
  }
  get pageSize() {
    return this._pageSize;
  }
  set virtualScroll(e) {
    this._virtualScroll = !!e, this.renderIfReady();
  }
  get virtualScroll() {
    return this._virtualScroll;
  }
  set rowHeight(e) {
    this._rowHeight = this.normalizePositiveNumber(e || void 0) || b, this.renderIfReady();
  }
  get rowHeight() {
    return this._rowHeight;
  }
  setData(e) {
    this.rows = e;
  }
  setRows(e) {
    this.setData(e);
  }
  setColumns(e) {
    this.columns = e;
  }
  clearSelection() {
    this._selectedIndex === null && this._checkedRows.size === 0 || (this._selectedIndex = null, this._checkedRows.clear(), this.dispatchSelectionChange(), this.renderIfReady());
  }
  getSelectedRow() {
    return this._selectedIndex === null ? null : this.getCurrentRows()[this._selectedIndex] || null;
  }
  getSelectedIndex() {
    return this.getSelectedRow() ? this._selectedIndex : null;
  }
  getSelectedRows() {
    const e = this.getCheckedRows(), t = this.getSelectedRow();
    return e.length > 0 ? e : t ? [t] : [];
  }
  getCheckedRows() {
    return this.getSortedRows().filter((e) => this._checkedRows.has(e));
  }
  refresh() {
    this.renderIfReady();
  }
  sortBy(e, t = "asc") {
    if (!this._columns.find((r) => r.field === e && r.sortable))
      return;
    const s = this.getSelectedRow();
    this._sortState = { field: e, direction: t }, this.restoreSelectedIndex(s), this.dispatchSortChange(), this.renderIfReady();
  }
  clearSort() {
    if (!this._sortState)
      return;
    const e = this.getSelectedRow();
    this._sortState = null, this.restoreSelectedIndex(e), this.dispatchSortChange(), this.renderIfReady();
  }
  setPage(e) {
    const t = this._page;
    this._page = this.getClampedPage(e), t !== this._page && (this._selectedIndex = null, this.dispatchPageChange()), this.renderIfReady();
  }
  setPageSize(e) {
    const t = this.normalizePositiveNumber(e) || this._pageSize;
    t !== this._pageSize && (this._pageSize = t, this._page = 1, this._selectedIndex = null, this.dispatchPageChange(), this.renderIfReady());
  }
  nextPage() {
    this.setPage(this._page + 1);
  }
  previousPage() {
    this.setPage(this._page - 1);
  }
  getPageInfo() {
    const e = this.getSortedRows().length, t = this.getTotalPages(e);
    return {
      page: this._page,
      pageSize: this._pageSize,
      totalRows: e,
      totalPages: t
    };
  }
  exportCsv(e = {}) {
    const t = e.includeHeaders !== !1, i = e.rows || this.getSortedRows(), s = [];
    return t && s.push(this._columns.map((r) => this.escapeCsvCell(this.sanitizeExportString(r.header))).join(",")), i.forEach((r, n) => {
      s.push(
        this._columns.map((o) => this.escapeCsvCell(this.getExportValue(r, o, n))).join(",")
      );
    }), s.join(`\r
`);
  }
  downloadCsv(e = "hc-grid.csv") {
    this.downloadFile(e, "text/csv;charset=utf-8", this.exportCsv({ fileName: e }));
  }
  exportExcel(e = {}) {
    const t = e.includeHeaders !== !1, i = e.rows || this.getSortedRows(), s = t ? `<tr>${this._columns.map((n) => `<th>${m(this.sanitizeExportString(n.header))}</th>`).join("")}</tr>` : "", r = i.map((n, o) => `<tr>${this._columns.map((a) => `<td>${m(String(this.getExportValue(n, a, o) ?? ""))}</td>`).join("")}</tr>`).join("");
    return [
      "<html>",
      '<head><meta charset="UTF-8" /></head>',
      "<body><table>",
      s,
      r,
      "</table></body>",
      "</html>"
    ].join("");
  }
  downloadExcel(e = "hc-grid.xls") {
    this.downloadFile(e, "application/vnd.ms-excel;charset=utf-8", this.exportExcel({ fileName: e }));
  }
  render() {
    const e = this.getContainer(), t = this.getHeader(), i = this.getBody(), s = this.getPager(), r = this.getOverlay(), n = this.getTemplateColumns();
    e.style.setProperty("--hc-grid-row-height", `${this._rowHeight}px`), e.setAttribute("aria-rowcount", String(this.getCurrentRows().length)), e.setAttribute("aria-colcount", String(this._columns.length + (this._checkboxSelection ? 1 : 0))), t.style.gridTemplateColumns = n, this.renderHeader(t), this.renderBody(i, n), this.renderPager(s), this.renderPopup(r);
  }
  renderPager(e) {
    if (e.replaceChildren(), e.hidden = !this._pagination, !this._pagination)
      return;
    const t = this.getPageInfo(), i = document.createElement("button"), s = document.createElement("button"), r = document.createElement("span");
    i.type = "button", i.className = "hc-grid__pager-button", i.textContent = "Previous", i.disabled = t.page <= 1, i.addEventListener("click", () => {
      this.previousPage();
    }), s.type = "button", s.className = "hc-grid__pager-button", s.textContent = "Next", s.disabled = t.page >= t.totalPages, s.addEventListener("click", () => {
      this.nextPage();
    }), r.className = "hc-grid__pager-status", r.textContent = `Page ${t.page} / ${t.totalPages} (${t.totalRows} rows)`, e.append(i, r, s);
  }
  renderPopup(e) {
    if (e.replaceChildren(), !this._popup)
      return;
    const t = document.createElement("div");
    t.className = "hc-grid__popup", t.style.left = `${this._popup.anchor.left}px`, t.style.top = `${this._popup.anchor.top}px`, t.style.minWidth = `${Math.max(this._popup.anchor.width, 160)}px`, t.addEventListener("pointerdown", (i) => {
      i.stopPropagation();
    }), t.addEventListener("click", (i) => {
      i.stopPropagation();
    }), this._popup.kind === "dropdown" && this.renderDropdownPopup(t, this._popup), this._popup.kind === "multi-select" && this.renderMultiSelectPopup(t, this._popup), e.append(t);
  }
  renderDropdownPopup(e, t) {
    this.getColumnOptions(t.column).forEach((i) => {
      const s = document.createElement("button");
      s.type = "button", s.className = "hc-grid__popup-item", s.textContent = i.label, s.addEventListener("click", () => {
        this.dispatchCellAction(
          t.row,
          t.rowIndex,
          t.column,
          t.value,
          String(i.value)
        ), this.closePopup();
      }), e.append(s);
    });
  }
  renderMultiSelectPopup(e, t) {
    const i = Array.isArray(t.row[t.column.field]) ? t.row[t.column.field] : [];
    this.getColumnOptions(t.column).forEach((s) => {
      const r = document.createElement("label"), n = document.createElement("input");
      r.className = "hc-grid__popup-check", n.type = "checkbox", n.checked = i.some((o) => Object.is(o, s.value)), n.addEventListener("change", () => {
        const o = n.checked ? [...i, s.value] : i.filter((c) => !Object.is(c, s.value));
        this.commitControlValue(t.row, t.rowIndex, t.column, o, !1), this._popup = {
          ...t,
          value: o
        }, this.renderPopup(this.getOverlay());
      }), r.append(n, document.createTextNode(s.label)), e.append(r);
    });
  }
  renderHeader(e) {
    e.replaceChildren(), this._checkboxSelection && e.append(this.createHeaderCheckboxCell()), this._columns.forEach((t, i) => {
      var r;
      const s = document.createElement("div");
      s.className = this.getCellClassName(t, "hc-grid__header-cell"), s.part.add("header-cell"), s.setAttribute("role", "columnheader"), s.setAttribute("aria-colindex", String(i + 1 + (this._checkboxSelection ? 1 : 0))), s.textContent = t.header, t.sortable && (s.classList.add("hc-grid__header-cell--sortable"), s.part.add("sortable-header-cell"), s.dataset.sortable = "true", s.tabIndex = 0, s.setAttribute("aria-sort", this.getAriaSortValue(t)), s.addEventListener("click", () => {
        this.toggleSort(t);
      }), s.addEventListener("keydown", (n) => {
        (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this.toggleSort(t));
      }), ((r = this._sortState) == null ? void 0 : r.field) === t.field && s.classList.add(`hc-grid__header-cell--sorted-${this._sortState.direction}`)), t.resizable && (s.classList.add("hc-grid__header-cell--resizable"), s.append(this.createResizeHandle(t))), e.append(s);
    });
  }
  createHeaderCheckboxCell() {
    const e = document.createElement("div"), t = document.createElement("input"), i = this.getCurrentRows(), s = i.filter((r) => this._checkedRows.has(r)).length;
    return e.className = "hc-grid__header-cell hc-grid__checkbox-cell", e.part.add("header-cell"), e.setAttribute("role", "columnheader"), e.setAttribute("aria-colindex", "1"), t.type = "checkbox", t.checked = i.length > 0 && s === i.length, t.indeterminate = s > 0 && s < i.length, t.addEventListener("click", (r) => {
      r.stopPropagation(), this.toggleAllCurrentRows(t.checked);
    }), e.append(t), e;
  }
  renderBody(e, t) {
    e.replaceChildren();
    const i = this.getCurrentRows();
    if (i.length === 0) {
      this.renderEmpty(e);
      return;
    }
    if (!this._virtualScroll) {
      i.forEach((h, p) => {
        e.append(this.createRow(h, p, t));
      });
      return;
    }
    const s = this.getContainer(), r = Math.max(1, Math.ceil(s.clientHeight / this._rowHeight) + 4), n = Math.max(0, Math.floor(s.scrollTop / this._rowHeight) - 2), o = Math.min(i.length, n + r), c = document.createElement("div"), a = document.createElement("div");
    c.className = "hc-grid__virtual-spacer", c.style.height = `${n * this._rowHeight}px`, a.className = "hc-grid__virtual-spacer", a.style.height = `${(i.length - o) * this._rowHeight}px`, e.append(c), i.slice(n, o).forEach((h, p) => {
      e.append(this.createRow(h, n + p, t));
    }), e.append(a);
  }
  renderEmpty(e) {
    const t = document.createElement("div");
    t.className = "hc-grid__empty", t.part.add("empty"), t.setAttribute("role", "status"), t.textContent = this._emptyText, e.append(t);
  }
  createRow(e, t, i) {
    const s = this._selectedIndex === t, r = document.createElement("div");
    return r.className = s ? "hc-grid__row hc-grid__row--selected" : "hc-grid__row", r.part.add("row"), r.style.gridTemplateColumns = i, r.setAttribute("role", "row"), r.setAttribute("tabindex", "0"), r.setAttribute("aria-rowindex", String(t + 1)), r.setAttribute("aria-selected", String(s)), this._virtualScroll && (r.style.minHeight = `${this._rowHeight}px`), s && r.part.add("selected-row"), r.addEventListener("click", () => {
      this._selectedIndex = t;
      const n = { row: e, index: t };
      this.dispatchEvent(
        new CustomEvent("row-click", {
          detail: n,
          bubbles: !0,
          composed: !0
        })
      ), this.render();
    }), this._checkboxSelection && r.append(this.createRowCheckboxCell(e)), this._columns.forEach((n, o) => {
      r.append(this.createCell(e, t, n, o));
    }), r;
  }
  createRowCheckboxCell(e) {
    const t = document.createElement("div"), i = document.createElement("input");
    return t.className = "hc-grid__cell hc-grid__checkbox-cell", t.part.add("cell"), t.setAttribute("role", "gridcell"), i.type = "checkbox", i.checked = this._checkedRows.has(e), i.addEventListener("click", (s) => {
      s.stopPropagation(), this.toggleRowChecked(e, i.checked);
    }), t.append(i), t;
  }
  createCell(e, t, i, s) {
    var c;
    const r = document.createElement("div");
    r.className = this.getCellClassName(i, "hc-grid__cell"), r.part.add("cell"), r.setAttribute("role", "gridcell"), r.setAttribute("aria-colindex", String(s + 1 + (this._checkboxSelection ? 1 : 0)));
    const n = e[i.field];
    return ((c = this._editingCell) == null ? void 0 : c.row) === e && this._editingCell.column.field === i.field && this._editingCell.rowIndex === t ? r.append(this.createCellEditor(e, t, i, n)) : i.component ? (r.classList.add("hc-grid__cell--component"), r.append(this.createCellComponent(e, t, i, n))) : this.renderCellValue(r, e, t, i), r.addEventListener("click", () => {
      const a = {
        row: e,
        column: i,
        rowIndex: t,
        value: n
      };
      this.dispatchEvent(
        new CustomEvent("cell-click", {
          detail: a,
          bubbles: !0,
          composed: !0
        })
      );
    }), i.editable && (r.classList.add("hc-grid__cell--editable"), r.addEventListener("dblclick", () => {
      this.startEdit(e, t, i);
    })), r;
  }
  renderCellValue(e, t, i, s) {
    const r = this.getFormattedValue(t, s, i);
    e.textContent = r == null ? "" : String(r);
  }
  createCellComponent(e, t, i, s) {
    if (i.component === "button")
      return this.createButtonComponent(e, t, i, s);
    if (i.component === "checkbox")
      return this.createCheckboxComponent(e, t, i, s);
    if (i.component === "dropdown-menu")
      return this.createDropdownMenuComponent(e, t, i, s);
    if (i.component === "input")
      return this.createInputComponent(e, t, i, s);
    if (i.component === "select")
      return this.createSelectComponent(e, t, i, s, !1);
    if (i.component === "multi-select")
      return this.createMultiSelectComponent(e, t, i, s);
    if (i.component === "badge")
      return this.createBadgeComponent(e, t, i);
    const r = document.createElement("span");
    return r.textContent = String(this.getFormattedValue(e, i, t) ?? ""), r;
  }
  createButtonComponent(e, t, i, s) {
    const r = document.createElement("button");
    return r.type = "button", r.className = "hc-grid__control hc-grid__button", r.textContent = i.buttonLabel || String(this.getFormattedValue(e, i, t) || "Button"), r.addEventListener("click", (n) => {
      n.stopPropagation(), this.dispatchCellAction(e, t, i, s, "click");
    }), r;
  }
  createCheckboxComponent(e, t, i, s) {
    const r = document.createElement("input");
    return r.type = "checkbox", r.className = "hc-grid__control hc-grid__control-checkbox", r.checked = !!s, r.addEventListener("click", (n) => {
      n.stopPropagation();
    }), r.addEventListener("change", () => {
      this.commitControlValue(e, t, i, r.checked);
    }), r;
  }
  createDropdownMenuComponent(e, t, i, s) {
    const r = document.createElement("button");
    return r.type = "button", r.className = "hc-grid__control hc-grid__dropdown-trigger", r.textContent = i.dropdownLabel || String(this.getFormattedValue(e, i, t) || "Menu"), r.addEventListener("click", (n) => {
      n.stopPropagation(), this.openPopup("dropdown", e, t, i, s, r);
    }), r;
  }
  createInputComponent(e, t, i, s) {
    const r = document.createElement("input");
    return r.className = "hc-grid__control hc-grid__input", r.value = s == null ? "" : String(s), r.addEventListener("click", (n) => {
      n.stopPropagation();
    }), r.addEventListener("change", () => {
      this.commitControlValue(e, t, i, r.value);
    }), r;
  }
  createSelectComponent(e, t, i, s, r) {
    const n = document.createElement("select"), o = Array.isArray(s) ? s : [s];
    return n.className = r ? "hc-grid__control hc-grid__select hc-grid__select--multiple" : "hc-grid__control hc-grid__select", n.multiple = r, this.getColumnOptions(i).forEach((c, a) => {
      const h = document.createElement("option");
      h.value = String(a), h.textContent = c.label, h.selected = o.some((p) => Object.is(p, c.value)), n.append(h);
    }), n.addEventListener("click", (c) => {
      c.stopPropagation();
    }), n.addEventListener("change", () => {
      var h;
      const c = this.getColumnOptions(i), a = r ? Array.from(n.selectedOptions).map((p) => {
        var _;
        return (_ = c[Number(p.value)]) == null ? void 0 : _.value;
      }) : (h = c[Number(n.value)]) == null ? void 0 : h.value;
      this.commitControlValue(e, t, i, a);
    }), n;
  }
  createMultiSelectComponent(e, t, i, s) {
    const r = document.createElement("button"), n = Array.isArray(s) ? s : [], o = this.getColumnOptions(i).filter((c) => n.some((a) => Object.is(a, c.value))).map((c) => c.label);
    return r.type = "button", r.className = "hc-grid__control hc-grid__multi-select-trigger", r.textContent = o.length > 0 ? o.join(", ") : "Select", r.addEventListener("click", (c) => {
      c.stopPropagation(), this.openPopup("multi-select", e, t, i, s, r);
    }), r;
  }
  createBadgeComponent(e, t, i) {
    const s = document.createElement("span"), r = this.getFormattedValue(e, i, t), n = String(e[i.field] ?? "default").toLowerCase().replace(/[^a-z0-9_-]/g, "");
    return s.className = `hc-grid__badge hc-grid__badge--${n || "default"}`, s.textContent = r == null ? "" : String(r), s;
  }
  openPopup(e, t, i, s, r, n) {
    const o = n.getBoundingClientRect(), c = Math.min(o.bottom + 4, window.innerHeight - 12);
    this._popup = {
      kind: e,
      row: t,
      column: s,
      rowIndex: i,
      value: r,
      anchor: {
        left: o.left,
        top: c,
        width: o.width
      }
    }, this.renderPopup(this.getOverlay());
  }
  closePopup() {
    this._popup && (this._popup = null, this.renderPopup(this.getOverlay()));
  }
  getColumnOptions(e) {
    return Array.isArray(e.options) ? e.options : [];
  }
  createCellEditor(e, t, i, s) {
    const r = document.createElement("input");
    return r.className = "hc-grid__cell-editor", r.value = s == null ? "" : String(s), r.addEventListener("click", (n) => {
      n.stopPropagation();
    }), r.addEventListener("keydown", (n) => {
      n.key === "Enter" && this.commitEdit(e, t, i, r.value), n.key === "Escape" && this.cancelEdit();
    }), r.addEventListener("blur", () => {
      var n;
      ((n = this._editingCell) == null ? void 0 : n.row) === e && this._editingCell.column.field === i.field && this.commitEdit(e, t, i, r.value);
    }), requestAnimationFrame(() => {
      r.focus(), r.select();
    }), r;
  }
  startEdit(e, t, i) {
    i.editable && (this._editingCell = { row: e, rowIndex: t, column: i }, this.render());
  }
  commitEdit(e, t, i, s) {
    const r = e[i.field];
    e[i.field] = s, this._editingCell = null;
    const n = {
      row: e,
      column: i,
      rowIndex: t,
      oldValue: r,
      value: s
    };
    this.dispatchEvent(
      new CustomEvent("cell-edit", {
        detail: n,
        bubbles: !0,
        composed: !0
      })
    ), this.render();
  }
  commitControlValue(e, t, i, s, r = !0) {
    const n = e[i.field];
    e[i.field] = s;
    const o = {
      row: e,
      column: i,
      rowIndex: t,
      oldValue: n,
      value: s
    };
    this.dispatchEvent(
      new CustomEvent("cell-edit", {
        detail: o,
        bubbles: !0,
        composed: !0
      })
    ), r && this.render();
  }
  dispatchCellAction(e, t, i, s, r) {
    const n = {
      row: e,
      column: i,
      rowIndex: t,
      value: s,
      action: r
    };
    this.dispatchEvent(
      new CustomEvent("cell-action", {
        detail: n,
        bubbles: !0,
        composed: !0
      })
    );
  }
  cancelEdit() {
    this._editingCell = null, this.render();
  }
  toggleSort(e) {
    if (!e.sortable)
      return;
    const t = this.getSelectedRow();
    !this._sortState || this._sortState.field !== e.field ? this._sortState = { field: e.field, direction: "asc" } : this._sortState.direction === "asc" ? this._sortState = { field: e.field, direction: "desc" } : this._sortState = null, this.restoreSelectedIndex(t), this.dispatchSortChange(), this.render();
  }
  toggleRowChecked(e, t) {
    t ? this._checkedRows.add(e) : this._checkedRows.delete(e), this.dispatchSelectionChange(), this.render();
  }
  toggleAllCurrentRows(e) {
    this.getCurrentRows().forEach((t) => {
      e ? this._checkedRows.add(t) : this._checkedRows.delete(t);
    }), this.dispatchSelectionChange(), this.render();
  }
  getCurrentRows() {
    const e = this.getSortedRows();
    if (!this._pagination)
      return e;
    const t = (this._page - 1) * this._pageSize;
    return e.slice(t, t + this._pageSize);
  }
  getSortedRows() {
    if (!this._sortState)
      return this._rows;
    const { field: e, direction: t } = this._sortState, i = t === "asc" ? 1 : -1;
    return this._rows.map((s, r) => ({ row: s, index: r })).sort((s, r) => {
      const n = this.compareValues(s.row[e], r.row[e]);
      return n === 0 ? s.index - r.index : n * i;
    }).map((s) => s.row);
  }
  getFormattedValue(e, t, i) {
    const s = e[t.field];
    return t.formatter ? t.formatter(s, e, t, i) : s;
  }
  compareValues(e, t) {
    return e == null && t == null ? 0 : e == null ? 1 : t == null ? -1 : typeof e == "number" && typeof t == "number" ? e - t : String(e).localeCompare(String(t), void 0, {
      numeric: !0,
      sensitivity: "base"
    });
  }
  dispatchSortChange() {
    const e = {
      sortState: this._sortState
    };
    this.dispatchEvent(
      new CustomEvent("sort-change", {
        detail: e,
        bubbles: !0,
        composed: !0
      })
    );
  }
  dispatchSelectionChange() {
    const e = {
      rows: this.getCheckedRows()
    };
    this.dispatchEvent(
      new CustomEvent("selection-change", {
        detail: e,
        bubbles: !0,
        composed: !0
      })
    );
  }
  dispatchPageChange() {
    const e = this.getPageInfo();
    this.dispatchEvent(
      new CustomEvent("page-change", {
        detail: e,
        bubbles: !0,
        composed: !0
      })
    );
  }
  getAriaSortValue(e) {
    var t;
    return ((t = this._sortState) == null ? void 0 : t.field) !== e.field ? "none" : this._sortState.direction === "asc" ? "ascending" : "descending";
  }
  getCellClassName(e, t) {
    const i = [t];
    return e.align === "center" && i.push("hc-grid__cell--center"), e.align === "right" && i.push("hc-grid__cell--right"), i.join(" ");
  }
  getTemplateColumns() {
    const e = this._columns.map((t) => this.getColumnTrack(t));
    return this._checkboxSelection && e.unshift(`${C}px`), e.length > 0 ? e.join(" ") : "minmax(160px, 1fr)";
  }
  getColumnTrack(e) {
    const i = this._columnWidths.get(e.field) || this.normalizePositiveNumber(e.width), s = this.normalizePositiveNumber(e.minWidth);
    return i && s ? `minmax(${s}px, ${Math.max(i, s)}px)` : i ? `${i}px` : s ? `minmax(${s}px, 1fr)` : "minmax(120px, 1fr)";
  }
  createResizeHandle(e) {
    const t = document.createElement("span");
    return t.className = "hc-grid__resize-handle", t.addEventListener("click", (i) => {
      i.stopPropagation();
    }), t.addEventListener("pointerdown", (i) => {
      i.preventDefault(), i.stopPropagation();
      const s = this._columnWidths.get(e.field) || e.width || 120;
      this._resizeState = {
        field: e.field,
        startX: i.clientX,
        startWidth: s
      }, t.setPointerCapture(i.pointerId);
    }), t.addEventListener("pointermove", (i) => {
      if (!this._resizeState || this._resizeState.field !== e.field)
        return;
      const s = this.normalizePositiveNumber(e.minWidth) || 48, r = Math.max(s, this._resizeState.startWidth + i.clientX - this._resizeState.startX);
      this._columnWidths.set(e.field, r), this.render();
    }), t.addEventListener("pointerup", () => {
      this._resizeState = null;
    }), t.addEventListener("pointercancel", () => {
      this._resizeState = null;
    }), t;
  }
  getTotalPages(e = this.getSortedRows().length) {
    return Math.max(1, Math.ceil(e / this._pageSize));
  }
  getClampedPage(e) {
    const t = Math.trunc(this.normalizePositiveNumber(e) || 1);
    return Math.min(Math.max(1, t), this.getTotalPages());
  }
  clampPage() {
    this._page = this.getClampedPage(this._page);
  }
  normalizePositiveNumber(e) {
    return typeof e == "number" && Number.isFinite(e) && e > 0 ? e : null;
  }
  resetSortIfColumnMissing() {
    if (!this._sortState)
      return;
    this._columns.some(
      (t) => {
        var i;
        return t.field === ((i = this._sortState) == null ? void 0 : i.field) && t.sortable;
      }
    ) || (this._sortState = null);
  }
  resetSelectionIfMissing() {
    this._checkedRows.forEach((e) => {
      this._rows.includes(e) || this._checkedRows.delete(e);
    }), this._selectedIndex !== null && this._selectedIndex >= this.getCurrentRows().length && (this._selectedIndex = null);
  }
  restoreSelectedIndex(e) {
    if (!e) {
      this._selectedIndex = null;
      return;
    }
    const t = this.getCurrentRows().indexOf(e);
    this._selectedIndex = t >= 0 ? t : null;
  }
  syncAttributes() {
    this.getContainer().style.setProperty("--hc-grid-height", this.getAttribute("height") || "none"), this._emptyText = this.getAttribute("empty-text") || this._emptyText;
  }
  renderIfReady() {
    this._isConnected && this.render();
  }
  upgradeProperty(e) {
    if (!Object.prototype.hasOwnProperty.call(this, e))
      return;
    const t = this[e];
    delete this[e], this[e] = t;
  }
  escapeCsvCell(e) {
    const t = e == null ? "" : String(e);
    return /[",\r\n]/.test(t) ? `"${t.replace(/"/g, '""')}"` : t;
  }
  getExportValue(e, t, i) {
    const s = this.getFormattedValue(e, t, i);
    return typeof s == "string" ? this.sanitizeExportString(s) : s;
  }
  sanitizeExportString(e) {
    return /^[=+\-@]/.test(e) ? `'${e}` : e;
  }
  downloadFile(e, t, i) {
    const s = new Blob([i], { type: t }), r = URL.createObjectURL(s), n = document.createElement("a");
    n.href = r, n.download = e, n.click(), URL.revokeObjectURL(r);
  }
  getContainer() {
    return this.shadow.querySelector(".hc-grid");
  }
  getHeader() {
    return this.shadow.querySelector(".hc-grid__header");
  }
  getBody() {
    return this.shadow.querySelector(".hc-grid__body");
  }
  getPager() {
    return this.shadow.querySelector(".hc-grid__pager");
  }
  getOverlay() {
    return this.shadow.querySelector(".hc-grid__overlay");
  }
}
function S(l = "hc-grid") {
  globalThis.customElements && (globalThis.customElements.get(l) || globalThis.customElements.define(l, y));
}
S();
export {
  y as HcGrid,
  y as HcGridElement,
  S as defineHcGrid,
  m as escapeHtml
};
