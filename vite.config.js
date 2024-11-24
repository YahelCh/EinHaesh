import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  publicDir: 'src',  // תיקיית assets מתוך src תהפוך ל-public
  plugins: [react()],
})


