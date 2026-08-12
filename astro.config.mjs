import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server', // or 'hybrid' depending on your pages
  adapter: netlify(),
});
