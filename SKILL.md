# HC Grid Development Skill

## Purpose

HC Grid는 프레임워크 독립형 Web Component 기반 Data Grid 라이브러리다.

## Core Principles

1. Framework Agnostic
2. Web Standards First
3. No External UI Dependency
4. Safe Rendering
5. Theme by CSS Variables
6. Small Core, Extendable Modules
7. Stable Public API

## Coding Rules

- TypeScript를 사용한다.
- 외부 UI 프레임워크에 의존하지 않는다.
- Shadow DOM 내부에서 스타일을 캡슐화한다.
- 외부 커스터마이징은 CSS 변수로 처리한다.
- 사용자 데이터는 `textContent` 또는 `escapeHtml`을 통해 안전하게 렌더링한다.
- public API 변경 시 README와 docs/api.md를 함께 수정한다.
- 이벤트는 CustomEvent로 발생시키며 bubbles, composed를 true로 설정한다.
- 기능 추가 시 기존 Vanilla HTML 사용성을 깨지 않는다.

## Component Rules

- 커스텀 엘리먼트 이름은 hc-grid를 유지한다.
- rows와 columns는 property 주입을 기본 방식으로 한다.
- attribute 기반 복잡한 JSON 설정은 기본 사용 방식으로 권장하지 않는다.
- 내부 상태는 private 필드로 관리한다.
- render는 상태 변경 후 명시적으로 호출한다.

## Event Rules

핵심 지원 이벤트:

- row-click
- cell-click
- sort-change

확장 기능 이벤트:

- selection-change
- cell-edit
- page-change

이벤트 detail은 타입 파일에 정의한다.

## Styling Rules

지원 CSS 변수:

- --hc-grid-font-family
- --hc-grid-bg
- --hc-grid-text-color
- --hc-grid-border-color
- --hc-grid-radius
- --hc-grid-header-bg
- --hc-grid-header-text-color
- --hc-grid-header-hover-bg
- --hc-grid-row-hover-bg
- --hc-grid-selected-bg
- --hc-grid-empty-text-color

## Build Rules

- Vite Library Mode를 사용한다.
- ESM과 UMD 번들을 모두 생성한다.
- TypeScript declaration 파일을 생성한다.

## Roadmap Priority

1. Basic rendering
2. Sorting
3. Row selection
4. Events
5. Theming
6. Checkbox selection
7. Column resize
8. Formatter
9. Pagination
10. Virtual scroll
11. Cell editing
12. Excel / CSV export

## Do Not

- React 전용 컴포넌트로 만들지 않는다.
- Vue 전용 컴포넌트로 만들지 않는다.
- jQuery에 의존하지 않는다.
- 외부 CSS 프레임워크를 강제하지 않는다.
- 셀 데이터를 innerHTML로 직접 주입하지 않는다.
