/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc"
import {
  fileURLToPath,
  URL,
} from "url"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ react() ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api/tabelog": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  test: {
    includeSource: [ "src/**/*.{js,ts,jsx,tsx}" ],
    environment: "jsdom",
  },
  define: {
    "import.meta.vitest": "undefined",
  },
})
