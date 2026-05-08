# Vue Example

```vue
<script setup lang="ts">
import '@highcolor/grid';
import { onMounted, ref } from 'vue';

const gridRef = ref<HTMLElement & { columns: unknown[]; rows: unknown[] }>();

onMounted(() => {
  if (!gridRef.value) return;
  gridRef.value.columns = [{ field: 'name', header: '이름', width: 120, sortable: true }];
  gridRef.value.rows = [{ name: '홍길동' }];
});
</script>

<template>
  <hc-grid ref="gridRef" />
</template>
```
