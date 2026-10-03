import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // Set SITE_URL to your public URL to enable canonical and Open Graph URLs.
  site: process.env.SITE_URL || undefined,
});
