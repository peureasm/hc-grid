# Theming

HC Grid는 Shadow DOM 내부에서 스타일을 캡슐화합니다. 외부 애플리케이션에서는 `hc-grid` 요소에 CSS 변수를 지정해서 테마를 변경합니다.

## Basic Theme Override

```css
hc-grid {
  --hc-grid-radius: 16px;
  --hc-grid-header-bg: #111827;
  --hc-grid-header-text-color: #ffffff;
  --hc-grid-selected-bg: #fff7ed;
}
```

## Supported CSS Variables

| 변수 | 설명 |
| --- | --- |
| `--hc-grid-font-family` | 그리드 폰트 패밀리 |
| `--hc-grid-bg` | 그리드 배경색 |
| `--hc-grid-text-color` | 기본 텍스트 색상 |
| `--hc-grid-border-color` | 테두리 색상 |
| `--hc-grid-radius` | 그리드 모서리 반경 |
| `--hc-grid-header-bg` | 헤더 배경색 |
| `--hc-grid-header-text-color` | 헤더 텍스트 색상 |
| `--hc-grid-header-hover-bg` | 헤더 hover 배경색 |
| `--hc-grid-row-hover-bg` | 행 hover 배경색 |
| `--hc-grid-selected-bg` | 선택된 행 배경색 |
| `--hc-grid-empty-text-color` | 빈 데이터 상태 텍스트 색상 |

## Full Example

```css
hc-grid {
  --hc-grid-font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --hc-grid-bg: #ffffff;
  --hc-grid-text-color: #172033;
  --hc-grid-border-color: #d8dee8;
  --hc-grid-radius: 10px;
  --hc-grid-header-bg: #f4f7fb;
  --hc-grid-header-text-color: #18202f;
  --hc-grid-header-hover-bg: #e9eef7;
  --hc-grid-row-hover-bg: #eef6ff;
  --hc-grid-selected-bg: #dbeafe;
  --hc-grid-empty-text-color: #657085;
}
```

## Dark Theme Example

```css
hc-grid.dark {
  --hc-grid-font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --hc-grid-bg: #111827;
  --hc-grid-text-color: #e5e7eb;
  --hc-grid-border-color: #374151;
  --hc-grid-radius: 12px;
  --hc-grid-header-bg: #030712;
  --hc-grid-header-text-color: #f9fafb;
  --hc-grid-header-hover-bg: #1f2937;
  --hc-grid-row-hover-bg: #172033;
  --hc-grid-selected-bg: #312e81;
  --hc-grid-empty-text-color: #9ca3af;
}
```

```html
<hc-grid class="dark"></hc-grid>
```

## Notes

일반 애플리케이션 CSS는 Shadow DOM 내부 셀이나 헤더에 직접 적용되지 않습니다. 디자인 변경은 CSS 변수로 처리하고, 구조 변경이 필요한 경우 public API 또는 향후 `part` 기반 확장 규칙을 사용합니다.
