import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  base: '/EducationOrderProfile/', // GitHub Pages repo name
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for build files
    emptyOutDir: true, // Ensures the outDir is emptied on each build.  Important!
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'), // Corrected path, relative to root
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
