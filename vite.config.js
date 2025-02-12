import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs';
import { env } from "node:process";

// get correct base name on github actions
const base = process.env.GITHUB_ACTIONS
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`  
  : '/';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
  ],
  base,
  ...(env.NODE_ENV === "development" && {
   server: {
      https: {
        key: fs.readFileSync('../localhost.key'),
        cert: fs.readFileSync('../localhost.crt'),
      },
    },
  } )
})
