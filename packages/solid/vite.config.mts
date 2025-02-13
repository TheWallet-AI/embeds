import { copyFileSync } from 'node:fs';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solid from 'vite-plugin-solid';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: '@thewalletai/embed-solid',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['solid-js'],
    },
  },
  plugins: [
    solid(),
    dts({
      include: ['src'],
      afterBuild() {
        copyFileSync('dist/index.d.ts', 'dist/index.d.mts');
      },
    }),
  ],
});
