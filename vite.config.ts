import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/wfapp/wf/",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@": path.resolve(__dirname, "src"),
      "#": path.resolve(__dirname, "src/types"),
    },
  },
  server: {
    /*  https: {
      cert: path.resolve(__dirname, "src/ssl/cert.crt"),
      key: path.resolve(__dirname, "src/ssl/cert.key"),
    }, */
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://indoor.lannovo.com/wf",
        secure: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
