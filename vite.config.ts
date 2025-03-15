import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ymmp-analyzer/', // GitHubリポジトリ名に合わせる
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})