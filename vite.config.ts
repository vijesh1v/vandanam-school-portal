import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Critical: './' allows assets to be found regardless of the subdirectory (GitHub Pages or Render)
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
  define: {
    // Prevents "Uncaught ReferenceError: process is not defined" in some libraries
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    }
  }
});