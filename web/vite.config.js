import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// When building on Vercel (src = root package.json), output goes to repo-root/public
// so vercel.json's distDir: "public" resolves correctly from the repo root.
const isVercel = process.env.VERCEL === '1';

export default defineConfig({
  plugins: [react()],
  envDir: './',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
