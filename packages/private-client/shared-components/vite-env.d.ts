/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_TITLE: string;
  // Add all your custom environment variables here
  readonly VITE_ANOTHER_VARIABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
