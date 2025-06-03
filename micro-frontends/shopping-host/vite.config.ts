import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  federation({
    name: 'shopping-host',
    filename: 'remoteEntry.js',
    remotes: {
      'recipes-remote': 'http://localhost:5001/assets/remoteEntry.js',
    },
    shared: ['react', 'react-dom', 'react-router-dom'],
  }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
