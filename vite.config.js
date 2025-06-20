import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import viteJoinMediaQueries from "vite-join-media-queries";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["mixed-decls"],
      },
    },
  },
  build: {
    modulePreload: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "pages/index.html"),
      },
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  plugins: [
    viteJoinMediaQueries(),
    handlebars({
      partialDirectory: resolve(__dirname, "components"),
    }),
  ],
});
