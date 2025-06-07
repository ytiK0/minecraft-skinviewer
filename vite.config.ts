import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const isLibBuild = process.env.LIB_BUILD === "true";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: isLibBuild ? false : undefined,
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        "skin-parts": path.resolve(__dirname, 'src/skin-parts.index.ts'),
        ears: path.resolve(__dirname, 'src/ears.index.ts')
      },
      name: 'McSkinViewer',
      fileName: (_, entryName) => `${entryName}.js`,
      formats: ['es']
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        'clsx'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          three: 'THREE'
        }
      }
    }
  }
})
