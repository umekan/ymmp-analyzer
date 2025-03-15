import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ymmp-script-extractor/', // GitHub Pagesでのサブディレクトリ名に合わせる
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})