/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAP_API: string
  readonly VITE_GOOGLE_MAP_ID: string
  readonly VITE_WEB3_AUTH_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
