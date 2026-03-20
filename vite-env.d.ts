/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TFL_APP_KEY: string
  readonly VITE_TFL_BASE_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_APP_NAME: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
