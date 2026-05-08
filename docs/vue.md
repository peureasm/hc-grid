# Vue

Import the custom element once, then assign properties after mount.

```vue
<script setup lang="ts">
import '@highcolor/grid';
import { onMounted, ref } from 'vue';

const gridRef = ref<any>(null);

onMounted(() => {
  const grid = gridRef.value;
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
});
</script>

<template>
  <hc-grid ref="gridRef" />
</template>
```
