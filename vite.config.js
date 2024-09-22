import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  plugins: [handlebars()],
  build: {
    outDir: resolve(__dirname, "dist"),
    roollupOptions: {
      input: {
        main: resolve(__dirname, "index.html")
      }
    }
  }
});
