import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.rashtan-soft.com/",
  output: "static",
  trailingSlash: "always",
  build: {
    format: "directory"
  },
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});
