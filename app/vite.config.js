import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: "/mordheim-simulator/", // or "" if you're deploying from root/docs folder
  plugins: [react()],
  build: {
    outDir: "../docs",
    emptyOutDir: true
  }
})