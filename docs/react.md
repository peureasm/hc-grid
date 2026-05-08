# React

Import the custom element once in a client-side entry, then assign properties through a ref.

```tsx
import '@highcolor/grid';
import { useEffect, useRef } from 'react';

export function UsersGrid() {
  const gridRef = useRef<any>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    grid.checkboxSelection = true;
    grid.columns = [
      { field: 'name', header: '이름', width: 120, sortable: true, resizable: true },
      { field: 'age', header: '나이', width: 80, align: 'center' }
    ];
    grid.rows = [
      { name: '홍길동', age: 32 },
      { name: '김철수', age: 41 }
    ];
  }, []);

  return <hc-grid ref={gridRef}></hc-grid>;
}
```
