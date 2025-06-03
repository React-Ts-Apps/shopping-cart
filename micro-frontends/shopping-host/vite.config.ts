import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation';

import dotenv from 'dotenv'
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
  federation({
    name: 'shopping-host',
    filename: 'remoteEntry.js',
    remotes: {
      'recipes-remote': `${process.env.VITE_REMOTE_RECIPES}/assets/remoteEntry.js`,
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
