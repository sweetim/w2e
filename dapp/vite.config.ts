/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc"
import {
  fileURLToPath,
  URL,
} from "url"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: {
        globPatterns: [ "**/*.{js,css,html,ico,png,svg}" ],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "where to eat",
        short_name: "w2e",
        description: "a dapp for finding restaurants",
        theme_color: "#f5f5f5",
        scope: "/",
        start_url: "/",
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png",
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable",
          },
        ],
      },
    }),
  ],
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
