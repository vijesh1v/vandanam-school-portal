import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Use VITE_BASE_PATH env var if it exists (for GitHub Pages), otherwise default to '/' (for Render/Local)
  const basePath = process.env.VITE_BASE_PATH || '/';

  return {
    plugins: [react()],
    base: basePath,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    define: {
      // This ensures process.env.API_KEY is replaced with the string value during build
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
    }
  };
});