import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]_[local]__[hash:base64:3]"
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three')) return 'three';
          if (id.includes('react-reconciler')) return 'react-core';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  }
})
