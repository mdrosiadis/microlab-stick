import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';
import { env } from "node:process";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
  ],
  ...(env.NODE_ENV === "development" && {
   server: {
      https: {
        key: fs.readFileSync('../localhost.key'),
        cert: fs.readFileSync('../localhost.crt'),
      },
    },
  } )
})
