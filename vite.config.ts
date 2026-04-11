import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],

    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },

    // ✅ Added - Performance & SEO improvements
    build: {
      // Chunk splitting for faster load times
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['motion/react'],
            icons: ['lucide-react'],
          },
        },
      },

      // Compress output files
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,   // removes console.log in production
          drop_debugger: true,  // removes debugger statements
        },
      },

      // Warn if chunk is too large
      chunkSizeWarningLimit: 1000,

      // Generate source maps for debugging
      sourcemap: false,
    },
  };
});