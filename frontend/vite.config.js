import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  base: '/EducationOrderProfile/', // GitHub Pages repo name
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for build files
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
        profile: resolve(__dirname, 'public/profile.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
