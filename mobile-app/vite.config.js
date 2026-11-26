import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'lucide-react': path.resolve(__dirname, '../node_modules/lucide-react'),
      'react': path.resolve(__dirname, '../node_modules/react'),
      'react-dom': path.resolve(__dirname, '../node_modules/react-dom'),
      'firebase': path.resolve(__dirname, '../node_modules/firebase')
    }
  },
  server: {
    port: 5173,
    host: true
  }
});
