# React Example

```tsx
import '@highcolor/grid';
import { useEffect, useRef } from 'react';

export function App() {
  const gridRef = useRef<HTMLElement & { columns: unknown[]; rows: unknown[] }>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.columns = [{ field: 'name', header: '이름', width: 120, sortable: true }];
    grid.rows = [{ name: '홍길동' }];
  }, []);

  return <hc-grid ref={gridRef}></hc-grid>;
}
```
