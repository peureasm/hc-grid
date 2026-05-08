export const gridStyles = `
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
`;
