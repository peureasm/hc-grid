(function(h,g){typeof exports=="object"&&typeof module<"u"?g(exports):typeof define=="function"&&define.amd?define(["exports"],g):(h=typeof globalThis<"u"?globalThis:h||self,g(h.HighColorGrid={}))})(this,(function(h){"use strict";var E=Object.defineProperty;var k=(h,g,u)=>g in h?E(h,g,{enumerable:!0,configurable:!0,writable:!0,value:u}):h[g]=u;var a=(h,g,u)=>k(h,typeof g!="symbol"?g+"":g,u);const g=`
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

  .hc-grid--card .hc-grid__header {
    display: none;
  }

  .hc-grid__body {
    min-width: max-content;
  }

  .hc-grid--card .hc-grid__body {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 12px;
    min-width: 0;
    padding: 12px;
  }

  .hc-grid__row {
    border-bottom: 1px solid var(--hc-grid-border-color);
  }

  .hc-grid__row:last-child {
    border-bottom: 0;
  }

  .hc-grid__card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;
    border: 1px solid var(--hc-grid-border-color);
    border-radius: var(--hc-grid-radius);
    padding: 12px;
    background: var(--hc-grid-bg);
  }

  .hc-grid__card:hover {
    background: var(--hc-grid-row-hover-bg);
  }

  .hc-grid__card--selected,
  .hc-grid__card--selected:hover {
    background: var(--hc-grid-selected-bg);
  }

  .hc-grid__card:focus-visible {
    outline: 2px solid var(--hc-grid-focus);
    outline-offset: -2px;
  }

  .hc-grid__card-header {
    min-width: 0;
  }

  .hc-grid__card-title {
    overflow: hidden;
    color: var(--hc-grid-text-color);
    font-size: 15px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hc-grid__card-subtitle {
    overflow: hidden;
    margin-top: 3px;
    color: var(--hc-grid-empty-text-color);
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hc-grid__card-check {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--hc-grid-empty-text-color);
    font-size: 12px;
  }

  .hc-grid__card-check input {
    width: 16px;
    height: 16px;
    margin: 0;
  }

  .hc-grid__card-content {
    display: grid;
    gap: 8px;
  }

  .hc-grid__card-custom {
    min-width: 0;
  }

  .hc-grid__card-field {
    display: grid;
    grid-template-columns: minmax(76px, 0.42fr) minmax(0, 1fr);
    gap: 10px;
    align-items: center;
    min-width: 0;
  }

  .hc-grid__card-label {
    overflow: hidden;
    color: var(--hc-grid-empty-text-color);
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hc-grid__card-value {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hc-grid__card-value--center {
    text-align: center;
  }

  .hc-grid__card-value--right {
    text-align: right;
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
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    padding: 12px 0 0;
    color: var(--hc-grid-text-color);
  }

  .hc-grid__pager[hidden] {
    display: none;
  }

  .hc-grid__pager-size {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--hc-grid-empty-text-color);
    white-space: nowrap;
  }

  .hc-grid__pager-select {
    min-height: 32px;
    border: 1px solid var(--hc-grid-border-color);
    border-radius: 6px;
    padding: 0 28px 0 8px;
    background: var(--hc-grid-bg);
    color: var(--hc-grid-text-color);
    font: inherit;
  }

  .hc-grid__pager-pages {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    min-width: 0;
    margin-left: auto;
  }

  .hc-grid__pager-arrow,
  .hc-grid__pager-page {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: #64748b;
    font: inherit;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
  }

  .hc-grid__pager-arrow {
    color: #1e3a8a;
    font-size: 28px;
    font-weight: 400;
  }

  .hc-grid__pager-arrow:hover:not(:disabled),
  .hc-grid__pager-page:hover:not(.hc-grid__pager-page--active) {
    background: var(--hc-grid-row-hover-bg);
    color: var(--hc-grid-text-color);
  }

  .hc-grid__pager-arrow:disabled {
    color: #cbd5e1;
    cursor: not-allowed;
  }

  .hc-grid__pager-page--active {
    background: #1e3a8a;
    color: #ffffff;
  }

  .hc-grid__pager-ellipsis {
    min-width: 28px;
    text-align: center;
    color: #64748b;
    font-weight: 600;
  }
`,u={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};function m(_){return String(_??"").replace(/[&<>"']/g,C=>u[C])}const b="No data",y=44,x=40,v=[5,10,20,50,100];class f extends HTMLElement{constructor(){super();a(this,"_columns",[]);a(this,"_rows",[]);a(this,"_sortState",null);a(this,"_selectedIndex",null);a(this,"shadow");a(this,"_emptyText",b);a(this,"_isConnected",!1);a(this,"_checkboxSelection",!1);a(this,"_checkedRows",new Set);a(this,"_columnWidths",new Map);a(this,"_pagination",!1);a(this,"_page",1);a(this,"_pageSize",20);a(this,"_pageSizeOptions",[...v]);a(this,"_virtualScroll",!1);a(this,"_rowHeight",x);a(this,"_viewMode","table");a(this,"_cardTitleField",null);a(this,"_cardSubtitleField",null);a(this,"_cardRenderer",null);a(this,"_editingCell",null);a(this,"_resizeState",null);a(this,"_popup",null);a(this,"handleDocumentPointerDown",e=>{e.composedPath().includes(this)||this.closePopup()});this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${g}</style>
      <div class="hc-grid" part="container" role="grid">
        <div class="hc-grid__header" part="header" role="row"></div>
        <div class="hc-grid__body" part="body"></div>
      </div>
      <div class="hc-grid__pager" part="pager" hidden></div>
      <div class="hc-grid__overlay" part="overlay"></div>
    `,this.getContainer().addEventListener("scroll",()=>{this._virtualScroll&&this.renderBody(this.getBody(),this.getTemplateColumns()),this.closePopup()})}static get observedAttributes(){return["height","empty-text"]}connectedCallback(){this.upgradeProperty("columns"),this.upgradeProperty("rows"),this.upgradeProperty("emptyText"),this.upgradeProperty("checkboxSelection"),this.upgradeProperty("pagination"),this.upgradeProperty("page"),this.upgradeProperty("pageSize"),this.upgradeProperty("pageSizeOptions"),this.upgradeProperty("virtualScroll"),this.upgradeProperty("rowHeight"),this.upgradeProperty("viewMode"),this.upgradeProperty("cardTitleField"),this.upgradeProperty("cardSubtitleField"),this.upgradeProperty("cardRenderer"),this._isConnected=!0,this.syncAttributes(),this.render(),document.addEventListener("pointerdown",this.handleDocumentPointerDown)}disconnectedCallback(){document.removeEventListener("pointerdown",this.handleDocumentPointerDown)}attributeChangedCallback(e){e==="empty-text"&&(this._emptyText=this.getAttribute("empty-text")||b),this._isConnected&&(this.syncAttributes(),this.render())}set columns(e){this._columns=Array.isArray(e)?e:[],this.resetSortIfColumnMissing(),this.renderIfReady()}get columns(){return this._columns}set rows(e){this._rows=Array.isArray(e)?e:[],this.resetSelectionIfMissing(),this.clampPage(),this.renderIfReady()}get rows(){return this._rows}set emptyText(e){this._emptyText=e||b,this.setAttribute("empty-text",this._emptyText),this.renderIfReady()}get emptyText(){return this._emptyText}get selectedRow(){return this.getSelectedRow()}set checkboxSelection(e){this._checkboxSelection=!!e,this.renderIfReady()}get checkboxSelection(){return this._checkboxSelection}set pagination(e){this._pagination=!!e,this.clampPage(),this.renderIfReady()}get pagination(){return this._pagination}set page(e){this.setPage(e||1)}get page(){return this._page}set pageSize(e){this.setPageSize(e||this._pageSize)}get pageSize(){return this._pageSize}set pageSizeOptions(e){const t=Array.isArray(e)?e.map(i=>this.normalizePositiveNumber(i)).filter(i=>i!==null):[];this._pageSizeOptions=t.length>0?Array.from(new Set(t)).sort((i,r)=>i-r):[...v],this._pageSizeOptions.includes(this._pageSize)||(this._pageSizeOptions=[...this._pageSizeOptions,this._pageSize].sort((i,r)=>i-r)),this.renderIfReady()}get pageSizeOptions(){return[...this._pageSizeOptions]}set virtualScroll(e){this._virtualScroll=!!e,this.renderIfReady()}get virtualScroll(){return this._virtualScroll}set rowHeight(e){this._rowHeight=this.normalizePositiveNumber(e||void 0)||x,this.renderIfReady()}get rowHeight(){return this._rowHeight}set viewMode(e){this._viewMode=e==="card"?"card":"table",this.closePopup(),this.renderIfReady()}get viewMode(){return this._viewMode}set cardTitleField(e){this._cardTitleField=e||null,this.renderIfReady()}get cardTitleField(){return this._cardTitleField}set cardSubtitleField(e){this._cardSubtitleField=e||null,this.renderIfReady()}get cardSubtitleField(){return this._cardSubtitleField}set cardRenderer(e){this._cardRenderer=typeof e=="function"?e:null,this.renderIfReady()}get cardRenderer(){return this._cardRenderer}setData(e){this.rows=e}setRows(e){this.setData(e)}setColumns(e){this.columns=e}clearSelection(){this._selectedIndex===null&&this._checkedRows.size===0||(this._selectedIndex=null,this._checkedRows.clear(),this.dispatchSelectionChange(),this.renderIfReady())}getSelectedRow(){return this._selectedIndex===null?null:this.getCurrentRows()[this._selectedIndex]||null}getSelectedIndex(){return this.getSelectedRow()?this._selectedIndex:null}getSelectedRows(){const e=this.getCheckedRows(),t=this.getSelectedRow();return e.length>0?e:t?[t]:[]}getCheckedRows(){return this.getSortedRows().filter(e=>this._checkedRows.has(e))}refresh(){this.renderIfReady()}sortBy(e,t="asc"){if(!this._columns.find(s=>s.field===e&&s.sortable))return;const r=this.getSelectedRow();this._sortState={field:e,direction:t},this.restoreSelectedIndex(r),this.dispatchSortChange(),this.renderIfReady()}clearSort(){if(!this._sortState)return;const e=this.getSelectedRow();this._sortState=null,this.restoreSelectedIndex(e),this.dispatchSortChange(),this.renderIfReady()}setPage(e){const t=this._page;this._page=this.getClampedPage(e),t!==this._page&&(this._selectedIndex=null,this.dispatchPageChange()),this.renderIfReady()}setPageSize(e){const t=this.normalizePositiveNumber(e)||this._pageSize;if(this._pageSizeOptions.includes(t)||(this._pageSizeOptions=[...this._pageSizeOptions,t].sort((i,r)=>i-r)),t===this._pageSize){this.renderIfReady();return}this._pageSize=t,this._page=1,this._selectedIndex=null,this.dispatchPageChange(),this.renderIfReady()}nextPage(){this.setPage(this._page+1)}previousPage(){this.setPage(this._page-1)}getPageInfo(){const e=this.getSortedRows().length,t=this.getTotalPages(e);return{page:this._page,pageSize:this._pageSize,pageSizeOptions:this.pageSizeOptions,totalRows:e,totalPages:t}}exportCsv(e={}){const t=e.includeHeaders!==!1,i=e.rows||this.getSortedRows(),r=[];return t&&r.push(this._columns.map(s=>this.escapeCsvCell(this.sanitizeExportString(s.header))).join(",")),i.forEach((s,n)=>{r.push(this._columns.map(d=>this.escapeCsvCell(this.getExportValue(s,d,n))).join(","))}),r.join(`\r
`)}downloadCsv(e="hc-grid.csv"){this.downloadFile(e,"text/csv;charset=utf-8",this.exportCsv({fileName:e}))}exportExcel(e={}){const t=e.includeHeaders!==!1,i=e.rows||this.getSortedRows(),r=t?`<tr>${this._columns.map(n=>`<th>${m(this.sanitizeExportString(n.header))}</th>`).join("")}</tr>`:"",s=i.map((n,d)=>`<tr>${this._columns.map(c=>`<td>${m(String(this.getExportValue(n,c,d)??""))}</td>`).join("")}</tr>`).join("");return["<html>",'<head><meta charset="UTF-8" /></head>',"<body><table>",r,s,"</table></body>","</html>"].join("")}downloadExcel(e="hc-grid.xls"){this.downloadFile(e,"application/vnd.ms-excel;charset=utf-8",this.exportExcel({fileName:e}))}render(){const e=this.getContainer(),t=this.getHeader(),i=this.getBody(),r=this.getPager(),s=this.getOverlay(),n=this.getTemplateColumns();e.classList.toggle("hc-grid--card",this._viewMode==="card"),t.hidden=this._viewMode==="card",e.style.setProperty("--hc-grid-row-height",`${this._rowHeight}px`),e.setAttribute("aria-rowcount",String(this.getCurrentRows().length)),e.setAttribute("aria-colcount",String(this._columns.length+(this._checkboxSelection?1:0))),t.style.gridTemplateColumns=n,this.renderHeader(t),this.renderBody(i,n),this.renderPager(r),this.renderPopup(s)}renderPager(e){if(e.replaceChildren(),e.hidden=!this._pagination,!this._pagination)return;const t=this.getPageInfo(),i=document.createElement("button"),r=document.createElement("button"),s=document.createElement("label"),n=document.createElement("select"),d=document.createElement("div");i.type="button",i.className="hc-grid__pager-arrow",i.textContent="‹",i.setAttribute("aria-label","Previous page"),i.disabled=t.page<=1,i.addEventListener("click",()=>{this.previousPage()}),r.type="button",r.className="hc-grid__pager-arrow",r.textContent="›",r.setAttribute("aria-label","Next page"),r.disabled=t.page>=t.totalPages,r.addEventListener("click",()=>{this.nextPage()}),s.className="hc-grid__pager-size",n.className="hc-grid__pager-select",n.setAttribute("aria-label","Rows per page"),this.pageSizeOptions.forEach(o=>{const c=document.createElement("option");c.value=String(o),c.textContent=String(o),c.selected=o===this._pageSize,n.append(c)}),n.addEventListener("change",()=>{this.setPageSize(Number(n.value))}),s.append(document.createTextNode("Rows"),n),d.className="hc-grid__pager-pages",d.setAttribute("aria-label",`Pagination, ${t.totalRows} rows`),d.append(i),this.getVisiblePageItems(t.page,t.totalPages).forEach(o=>{if(o==="ellipsis"){const l=document.createElement("span");l.className="hc-grid__pager-ellipsis",l.textContent="...",l.setAttribute("aria-hidden","true"),d.append(l);return}const c=document.createElement("button");c.type="button",c.className="hc-grid__pager-page",c.textContent=String(o),c.setAttribute("aria-label",`Page ${o}`),o===t.page&&(c.classList.add("hc-grid__pager-page--active"),c.setAttribute("aria-current","page")),c.addEventListener("click",()=>{this.setPage(o)}),d.append(c)}),d.append(r),e.append(s,d)}renderPopup(e){if(e.replaceChildren(),!this._popup)return;const t=document.createElement("div");t.className="hc-grid__popup",t.style.left=`${this._popup.anchor.left}px`,t.style.top=`${this._popup.anchor.top}px`,t.style.minWidth=`${Math.max(this._popup.anchor.width,160)}px`,t.addEventListener("pointerdown",i=>{i.stopPropagation()}),t.addEventListener("click",i=>{i.stopPropagation()}),this._popup.kind==="dropdown"&&this.renderDropdownPopup(t,this._popup),this._popup.kind==="multi-select"&&this.renderMultiSelectPopup(t,this._popup),e.append(t)}renderDropdownPopup(e,t){this.getColumnOptions(t.column).forEach(i=>{const r=document.createElement("button");r.type="button",r.className="hc-grid__popup-item",r.textContent=i.label,r.addEventListener("click",()=>{this.dispatchCellAction(t.row,t.rowIndex,t.column,t.value,String(i.value)),this.closePopup()}),e.append(r)})}renderMultiSelectPopup(e,t){const i=Array.isArray(t.row[t.column.field])?t.row[t.column.field]:[];this.getColumnOptions(t.column).forEach(r=>{const s=document.createElement("label"),n=document.createElement("input");s.className="hc-grid__popup-check",n.type="checkbox",n.checked=i.some(d=>Object.is(d,r.value)),n.addEventListener("change",()=>{const d=n.checked?[...i,r.value]:i.filter(o=>!Object.is(o,r.value));this.commitControlValue(t.row,t.rowIndex,t.column,d,!1),this._popup={...t,value:d},this.renderPopup(this.getOverlay())}),s.append(n,document.createTextNode(r.label)),e.append(s)})}renderHeader(e){e.replaceChildren(),this._checkboxSelection&&e.append(this.createHeaderCheckboxCell()),this._columns.forEach((t,i)=>{var s;const r=document.createElement("div");r.className=this.getCellClassName(t,"hc-grid__header-cell"),r.part.add("header-cell"),r.setAttribute("role","columnheader"),r.setAttribute("aria-colindex",String(i+1+(this._checkboxSelection?1:0))),r.textContent=t.header,t.sortable&&(r.classList.add("hc-grid__header-cell--sortable"),r.part.add("sortable-header-cell"),r.dataset.sortable="true",r.tabIndex=0,r.setAttribute("aria-sort",this.getAriaSortValue(t)),r.addEventListener("click",()=>{this.toggleSort(t)}),r.addEventListener("keydown",n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),this.toggleSort(t))}),((s=this._sortState)==null?void 0:s.field)===t.field&&r.classList.add(`hc-grid__header-cell--sorted-${this._sortState.direction}`)),t.resizable&&(r.classList.add("hc-grid__header-cell--resizable"),r.append(this.createResizeHandle(t))),e.append(r)})}createHeaderCheckboxCell(){const e=document.createElement("div"),t=document.createElement("input"),i=this.getCurrentRows(),r=i.filter(s=>this._checkedRows.has(s)).length;return e.className="hc-grid__header-cell hc-grid__checkbox-cell",e.part.add("header-cell"),e.setAttribute("role","columnheader"),e.setAttribute("aria-colindex","1"),t.type="checkbox",t.checked=i.length>0&&r===i.length,t.indeterminate=r>0&&r<i.length,t.addEventListener("click",s=>{s.stopPropagation(),this.toggleAllCurrentRows(t.checked)}),e.append(t),e}renderBody(e,t){e.replaceChildren(),e.classList.toggle("hc-grid__body--cards",this._viewMode==="card");const i=this.getCurrentRows();if(i.length===0){this.renderEmpty(e);return}if(this._viewMode==="card"){this.renderCards(e,i);return}if(!this._virtualScroll){i.forEach((l,p)=>{e.append(this.createRow(l,p,t))});return}const r=this.getContainer(),s=Math.max(1,Math.ceil(r.clientHeight/this._rowHeight)+4),n=Math.max(0,Math.floor(r.scrollTop/this._rowHeight)-2),d=Math.min(i.length,n+s),o=document.createElement("div"),c=document.createElement("div");o.className="hc-grid__virtual-spacer",o.style.height=`${n*this._rowHeight}px`,c.className="hc-grid__virtual-spacer",c.style.height=`${(i.length-d)*this._rowHeight}px`,e.append(o),i.slice(n,d).forEach((l,p)=>{e.append(this.createRow(l,n+p,t))}),e.append(c)}renderCards(e,t){e.classList.add("hc-grid__body--cards"),t.forEach((i,r)=>{e.append(this.createCard(i,r))})}renderEmpty(e){const t=document.createElement("div");t.className="hc-grid__empty",t.part.add("empty"),t.setAttribute("role","status"),t.textContent=this._emptyText,e.append(t)}createCard(e,t){const i=this._selectedIndex===t,r=document.createElement("div");r.className=i?"hc-grid__card hc-grid__card--selected":"hc-grid__card",r.part.add("row"),r.setAttribute("role","row"),r.setAttribute("tabindex","0"),r.setAttribute("aria-rowindex",String(t+1)),r.setAttribute("aria-selected",String(i)),r.addEventListener("click",()=>{this._selectedIndex=t;const d={row:e,index:t};this.dispatchEvent(new CustomEvent("row-click",{detail:d,bubbles:!0,composed:!0})),this.render()});const s=this.createCustomCardContent(e,t,i);if(s)return r.append(s),r;r.append(this.createCardHeader(e)),this._checkboxSelection&&r.append(this.createCardCheckbox(e));const n=document.createElement("div");return n.className="hc-grid__card-content",this._columns.forEach((d,o)=>{d.field===this._cardTitleField||d.field===this._cardSubtitleField||n.append(this.createCardField(e,t,d,o))}),r.append(n),r}createCustomCardContent(e,t,i){if(!this._cardRenderer)return null;const r=this._cardRenderer({row:e,rowIndex:t,columns:this._columns,selected:i,checked:this._checkedRows.has(e),toggleChecked:s=>{this.toggleRowChecked(e,s??!this._checkedRows.has(e))}});if(r==null)return null;if(typeof r=="string"){const s=document.createElement("div");return s.className="hc-grid__card-custom",s.textContent=r,s}return r}createCardHeader(e){var n;const t=document.createElement("div"),i=document.createElement("div"),r=document.createElement("div"),s=this._cardTitleField||((n=this._columns[0])==null?void 0:n.field);return t.className="hc-grid__card-header",i.className="hc-grid__card-title",i.textContent=s?String(e[s]??""):"Card",t.append(i),this._cardSubtitleField&&(r.className="hc-grid__card-subtitle",r.textContent=String(e[this._cardSubtitleField]??""),t.append(r)),t}createCardCheckbox(e){const t=document.createElement("label"),i=document.createElement("input");return t.className="hc-grid__card-check",i.type="checkbox",i.checked=this._checkedRows.has(e),i.addEventListener("click",r=>{r.stopPropagation()}),i.addEventListener("change",()=>{this.toggleRowChecked(e,i.checked)}),t.append(i,document.createTextNode("Selected")),t}createCardField(e,t,i,r){const s=document.createElement("div"),n=document.createElement("div"),d=document.createElement("div"),o=e[i.field];return s.className="hc-grid__card-field",n.className="hc-grid__card-label",n.textContent=i.header,d.className="hc-grid__card-value",i.align==="center"&&d.classList.add("hc-grid__card-value--center"),i.align==="right"&&d.classList.add("hc-grid__card-value--right"),i.component?d.append(this.createCellComponent(e,t,i,o)):d.textContent=String(this.getFormattedValue(e,i,t)??""),d.addEventListener("click",c=>{c.stopPropagation();const l={row:e,column:i,rowIndex:t,value:o};this.dispatchEvent(new CustomEvent("cell-click",{detail:l,bubbles:!0,composed:!0}))}),d.setAttribute("aria-colindex",String(r+1+(this._checkboxSelection?1:0))),s.append(n,d),s}createRow(e,t,i){const r=this._selectedIndex===t,s=document.createElement("div");return s.className=r?"hc-grid__row hc-grid__row--selected":"hc-grid__row",s.part.add("row"),s.style.gridTemplateColumns=i,s.setAttribute("role","row"),s.setAttribute("tabindex","0"),s.setAttribute("aria-rowindex",String(t+1)),s.setAttribute("aria-selected",String(r)),this._virtualScroll&&(s.style.minHeight=`${this._rowHeight}px`),r&&s.part.add("selected-row"),s.addEventListener("click",()=>{this._selectedIndex=t;const n={row:e,index:t};this.dispatchEvent(new CustomEvent("row-click",{detail:n,bubbles:!0,composed:!0})),this.render()}),this._checkboxSelection&&s.append(this.createRowCheckboxCell(e)),this._columns.forEach((n,d)=>{s.append(this.createCell(e,t,n,d))}),s}createRowCheckboxCell(e){const t=document.createElement("div"),i=document.createElement("input");return t.className="hc-grid__cell hc-grid__checkbox-cell",t.part.add("cell"),t.setAttribute("role","gridcell"),i.type="checkbox",i.checked=this._checkedRows.has(e),i.addEventListener("click",r=>{r.stopPropagation(),this.toggleRowChecked(e,i.checked)}),t.append(i),t}createCell(e,t,i,r){var o;const s=document.createElement("div");s.className=this.getCellClassName(i,"hc-grid__cell"),s.part.add("cell"),s.setAttribute("role","gridcell"),s.setAttribute("aria-colindex",String(r+1+(this._checkboxSelection?1:0)));const n=e[i.field];return((o=this._editingCell)==null?void 0:o.row)===e&&this._editingCell.column.field===i.field&&this._editingCell.rowIndex===t?s.append(this.createCellEditor(e,t,i,n)):i.component?(s.classList.add("hc-grid__cell--component"),s.append(this.createCellComponent(e,t,i,n))):this.renderCellValue(s,e,t,i),s.addEventListener("click",()=>{const c={row:e,column:i,rowIndex:t,value:n};this.dispatchEvent(new CustomEvent("cell-click",{detail:c,bubbles:!0,composed:!0}))}),i.editable&&(s.classList.add("hc-grid__cell--editable"),s.addEventListener("dblclick",()=>{this.startEdit(e,t,i)})),s}renderCellValue(e,t,i,r){const s=this.getFormattedValue(t,r,i);e.textContent=s==null?"":String(s)}createCellComponent(e,t,i,r){if(i.component==="button")return this.createButtonComponent(e,t,i,r);if(i.component==="checkbox")return this.createCheckboxComponent(e,t,i,r);if(i.component==="dropdown-menu")return this.createDropdownMenuComponent(e,t,i,r);if(i.component==="input")return this.createInputComponent(e,t,i,r);if(i.component==="select")return this.createSelectComponent(e,t,i,r,!1);if(i.component==="multi-select")return this.createMultiSelectComponent(e,t,i,r);if(i.component==="badge")return this.createBadgeComponent(e,t,i);const s=document.createElement("span");return s.textContent=String(this.getFormattedValue(e,i,t)??""),s}createButtonComponent(e,t,i,r){const s=document.createElement("button");return s.type="button",s.className="hc-grid__control hc-grid__button",s.textContent=i.buttonLabel||String(this.getFormattedValue(e,i,t)||"Button"),s.addEventListener("click",n=>{n.stopPropagation(),this.dispatchCellAction(e,t,i,r,"click")}),s}createCheckboxComponent(e,t,i,r){const s=document.createElement("input");return s.type="checkbox",s.className="hc-grid__control hc-grid__control-checkbox",s.checked=!!r,s.addEventListener("click",n=>{n.stopPropagation()}),s.addEventListener("change",()=>{this.commitControlValue(e,t,i,s.checked)}),s}createDropdownMenuComponent(e,t,i,r){const s=document.createElement("button");return s.type="button",s.className="hc-grid__control hc-grid__dropdown-trigger",s.textContent=i.dropdownLabel||String(this.getFormattedValue(e,i,t)||"Menu"),s.addEventListener("click",n=>{n.stopPropagation(),this.openPopup("dropdown",e,t,i,r,s)}),s}createInputComponent(e,t,i,r){const s=document.createElement("input");return s.className="hc-grid__control hc-grid__input",s.value=r==null?"":String(r),s.addEventListener("click",n=>{n.stopPropagation()}),s.addEventListener("change",()=>{this.commitControlValue(e,t,i,s.value)}),s}createSelectComponent(e,t,i,r,s){const n=document.createElement("select"),d=Array.isArray(r)?r:[r];return n.className=s?"hc-grid__control hc-grid__select hc-grid__select--multiple":"hc-grid__control hc-grid__select",n.multiple=s,this.getColumnOptions(i).forEach((o,c)=>{const l=document.createElement("option");l.value=String(c),l.textContent=o.label,l.selected=d.some(p=>Object.is(p,o.value)),n.append(l)}),n.addEventListener("click",o=>{o.stopPropagation()}),n.addEventListener("change",()=>{var l;const o=this.getColumnOptions(i),c=s?Array.from(n.selectedOptions).map(p=>{var S;return(S=o[Number(p.value)])==null?void 0:S.value}):(l=o[Number(n.value)])==null?void 0:l.value;this.commitControlValue(e,t,i,c)}),n}createMultiSelectComponent(e,t,i,r){const s=document.createElement("button"),n=Array.isArray(r)?r:[],d=this.getColumnOptions(i).filter(o=>n.some(c=>Object.is(c,o.value))).map(o=>o.label);return s.type="button",s.className="hc-grid__control hc-grid__multi-select-trigger",s.textContent=d.length>0?d.join(", "):"Select",s.addEventListener("click",o=>{o.stopPropagation(),this.openPopup("multi-select",e,t,i,r,s)}),s}createBadgeComponent(e,t,i){const r=document.createElement("span"),s=this.getFormattedValue(e,i,t),n=String(e[i.field]??"default").toLowerCase().replace(/[^a-z0-9_-]/g,"");return r.className=`hc-grid__badge hc-grid__badge--${n||"default"}`,r.textContent=s==null?"":String(s),r}openPopup(e,t,i,r,s,n){const d=n.getBoundingClientRect(),o=Math.min(d.bottom+4,window.innerHeight-12);this._popup={kind:e,row:t,column:r,rowIndex:i,value:s,anchor:{left:d.left,top:o,width:d.width}},this.renderPopup(this.getOverlay())}closePopup(){this._popup&&(this._popup=null,this.renderPopup(this.getOverlay()))}getColumnOptions(e){return Array.isArray(e.options)?e.options:[]}createCellEditor(e,t,i,r){const s=document.createElement("input");return s.className="hc-grid__cell-editor",s.value=r==null?"":String(r),s.addEventListener("click",n=>{n.stopPropagation()}),s.addEventListener("keydown",n=>{n.key==="Enter"&&this.commitEdit(e,t,i,s.value),n.key==="Escape"&&this.cancelEdit()}),s.addEventListener("blur",()=>{var n;((n=this._editingCell)==null?void 0:n.row)===e&&this._editingCell.column.field===i.field&&this.commitEdit(e,t,i,s.value)}),requestAnimationFrame(()=>{s.focus(),s.select()}),s}startEdit(e,t,i){i.editable&&(this._editingCell={row:e,rowIndex:t,column:i},this.render())}commitEdit(e,t,i,r){const s=e[i.field];e[i.field]=r,this._editingCell=null;const n={row:e,column:i,rowIndex:t,oldValue:s,value:r};this.dispatchEvent(new CustomEvent("cell-edit",{detail:n,bubbles:!0,composed:!0})),this.render()}commitControlValue(e,t,i,r,s=!0){const n=e[i.field];e[i.field]=r;const d={row:e,column:i,rowIndex:t,oldValue:n,value:r};this.dispatchEvent(new CustomEvent("cell-edit",{detail:d,bubbles:!0,composed:!0})),s&&this.render()}dispatchCellAction(e,t,i,r,s){const n={row:e,column:i,rowIndex:t,value:r,action:s};this.dispatchEvent(new CustomEvent("cell-action",{detail:n,bubbles:!0,composed:!0}))}cancelEdit(){this._editingCell=null,this.render()}toggleSort(e){if(!e.sortable)return;const t=this.getSelectedRow();!this._sortState||this._sortState.field!==e.field?this._sortState={field:e.field,direction:"asc"}:this._sortState.direction==="asc"?this._sortState={field:e.field,direction:"desc"}:this._sortState=null,this.restoreSelectedIndex(t),this.dispatchSortChange(),this.render()}toggleRowChecked(e,t){t?this._checkedRows.add(e):this._checkedRows.delete(e),this.dispatchSelectionChange(),this.render()}toggleAllCurrentRows(e){this.getCurrentRows().forEach(t=>{e?this._checkedRows.add(t):this._checkedRows.delete(t)}),this.dispatchSelectionChange(),this.render()}getCurrentRows(){const e=this.getSortedRows();if(!this._pagination)return e;const t=(this._page-1)*this._pageSize;return e.slice(t,t+this._pageSize)}getSortedRows(){if(!this._sortState)return this._rows;const{field:e,direction:t}=this._sortState,i=t==="asc"?1:-1;return this._rows.map((r,s)=>({row:r,index:s})).sort((r,s)=>{const n=this.compareValues(r.row[e],s.row[e]);return n===0?r.index-s.index:n*i}).map(r=>r.row)}getFormattedValue(e,t,i){const r=e[t.field];return t.formatter?t.formatter(r,e,t,i):r}compareValues(e,t){return e==null&&t==null?0:e==null?1:t==null?-1:typeof e=="number"&&typeof t=="number"?e-t:String(e).localeCompare(String(t),void 0,{numeric:!0,sensitivity:"base"})}dispatchSortChange(){const e={sortState:this._sortState};this.dispatchEvent(new CustomEvent("sort-change",{detail:e,bubbles:!0,composed:!0}))}dispatchSelectionChange(){const e={rows:this.getCheckedRows()};this.dispatchEvent(new CustomEvent("selection-change",{detail:e,bubbles:!0,composed:!0}))}dispatchPageChange(){const e=this.getPageInfo();this.dispatchEvent(new CustomEvent("page-change",{detail:e,bubbles:!0,composed:!0}))}getAriaSortValue(e){var t;return((t=this._sortState)==null?void 0:t.field)!==e.field?"none":this._sortState.direction==="asc"?"ascending":"descending"}getCellClassName(e,t){const i=[t];return e.align==="center"&&i.push("hc-grid__cell--center"),e.align==="right"&&i.push("hc-grid__cell--right"),i.join(" ")}getTemplateColumns(){const e=this._columns.map(t=>this.getColumnTrack(t));return this._checkboxSelection&&e.unshift(`${y}px`),e.length>0?e.join(" "):"minmax(160px, 1fr)"}getColumnTrack(e){const i=this._columnWidths.get(e.field)||this.normalizePositiveNumber(e.width),r=this.normalizePositiveNumber(e.minWidth);return i&&r?`minmax(${r}px, ${Math.max(i,r)}px)`:i?`${i}px`:r?`minmax(${r}px, 1fr)`:"minmax(120px, 1fr)"}createResizeHandle(e){const t=document.createElement("span");return t.className="hc-grid__resize-handle",t.addEventListener("click",i=>{i.stopPropagation()}),t.addEventListener("pointerdown",i=>{i.preventDefault(),i.stopPropagation();const r=this._columnWidths.get(e.field)||e.width||120;this._resizeState={field:e.field,startX:i.clientX,startWidth:r},t.setPointerCapture(i.pointerId)}),t.addEventListener("pointermove",i=>{if(!this._resizeState||this._resizeState.field!==e.field)return;const r=this.normalizePositiveNumber(e.minWidth)||48,s=Math.max(r,this._resizeState.startWidth+i.clientX-this._resizeState.startX);this._columnWidths.set(e.field,s),this.render()}),t.addEventListener("pointerup",()=>{this._resizeState=null}),t.addEventListener("pointercancel",()=>{this._resizeState=null}),t}getTotalPages(e=this.getSortedRows().length){return Math.max(1,Math.ceil(e/this._pageSize))}getVisiblePageItems(e,t){return t<=7?Array.from({length:t},(i,r)=>r+1):e<=4?[1,2,3,4,5,"ellipsis",t]:e>=t-3?[1,"ellipsis",t-4,t-3,t-2,t-1,t]:[1,"ellipsis",e-1,e,e+1,"ellipsis",t]}getClampedPage(e){const t=Math.trunc(this.normalizePositiveNumber(e)||1);return Math.min(Math.max(1,t),this.getTotalPages())}clampPage(){this._page=this.getClampedPage(this._page)}normalizePositiveNumber(e){return typeof e=="number"&&Number.isFinite(e)&&e>0?e:null}resetSortIfColumnMissing(){if(!this._sortState)return;this._columns.some(t=>{var i;return t.field===((i=this._sortState)==null?void 0:i.field)&&t.sortable})||(this._sortState=null)}resetSelectionIfMissing(){this._checkedRows.forEach(e=>{this._rows.includes(e)||this._checkedRows.delete(e)}),this._selectedIndex!==null&&this._selectedIndex>=this.getCurrentRows().length&&(this._selectedIndex=null)}restoreSelectedIndex(e){if(!e){this._selectedIndex=null;return}const t=this.getCurrentRows().indexOf(e);this._selectedIndex=t>=0?t:null}syncAttributes(){this.getContainer().style.setProperty("--hc-grid-height",this.getAttribute("height")||"none"),this._emptyText=this.getAttribute("empty-text")||this._emptyText}renderIfReady(){this._isConnected&&this.render()}upgradeProperty(e){if(!Object.prototype.hasOwnProperty.call(this,e))return;const t=this[e];delete this[e],this[e]=t}escapeCsvCell(e){const t=e==null?"":String(e);return/[",\r\n]/.test(t)?`"${t.replace(/"/g,'""')}"`:t}getExportValue(e,t,i){const r=this.getFormattedValue(e,t,i);return typeof r=="string"?this.sanitizeExportString(r):r}sanitizeExportString(e){return/^[=+\-@]/.test(e)?`'${e}`:e}downloadFile(e,t,i){const r=new Blob([i],{type:t}),s=URL.createObjectURL(r),n=document.createElement("a");n.href=s,n.download=e,n.click(),URL.revokeObjectURL(s)}getContainer(){return this.shadow.querySelector(".hc-grid")}getHeader(){return this.shadow.querySelector(".hc-grid__header")}getBody(){return this.shadow.querySelector(".hc-grid__body")}getPager(){return this.shadow.querySelector(".hc-grid__pager")}getOverlay(){return this.shadow.querySelector(".hc-grid__overlay")}}function w(_="hc-grid"){globalThis.customElements&&(globalThis.customElements.get(_)||globalThis.customElements.define(_,f))}w(),h.HcGrid=f,h.HcGridElement=f,h.defineHcGrid=w,h.escapeHtml=m,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})}));
