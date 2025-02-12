import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
 server: {
    https: {
      key: fs.readFileSync('../localhost.key'),
      cert: fs.readFileSync('../localhost.crt'),
    },
  },
  plugins: [
    svelte(),
    tailwindcss(),
  ],
})
