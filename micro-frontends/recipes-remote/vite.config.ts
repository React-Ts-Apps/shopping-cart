import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  federation({
    name: 'recipes-remote',
    filename: 'remoteEntry.js',
    exposes: {
      "./RecipesApp": './src/RecipesApp.tsx',
    },
    shared: ['react', 'react-dom', 'react-router-dom'],
  }),
  tailwindcss()
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001,
    strictPort: true,
  },
})
