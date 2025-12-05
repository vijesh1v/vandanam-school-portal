import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This is critical for GitHub Pages. It matches your repository name.
  base: '/vandanam-school-portal/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    // This allows process.env.API_KEY to work in the browser for the demo
    // The JSON.stringify is important to handle the value correctly
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY || '')
  }
});