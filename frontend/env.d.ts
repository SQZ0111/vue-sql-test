/// <reference types="vite/client" />
// env.d.ts
interface ImportMetaEnv {
  readonly VITE_BACKEND_BASE_URI: string
  readonly VITE_CREATE_BLOGS_ROUTE: string
  readonly VITE_GET_BLOGS_ROUTE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
