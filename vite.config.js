import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard Vite + React setup. Add a dev proxy here once your backend exists:
//
//   server: { proxy: { '/api': 'http://localhost:3000' } }
//
export default defineConfig({
  plugins: [react()],
});
