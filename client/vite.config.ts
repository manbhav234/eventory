import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/v1": {target: "http://localhost:3000"}
    }
  },
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, 'src'),
    },
  },
})
