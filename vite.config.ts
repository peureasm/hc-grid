import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'HighColorGrid',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'hc-grid.es.js' : 'hc-grid.umd.js')
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
});
