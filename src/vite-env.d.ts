/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVICE_NAME: string;
  readonly VITE_SERVICE_VERSION: string;

  readonly VITE_OIDC_CLIENT_ID: string;
  readonly VITE_OIDC_CLIENT_SECRET: string;
  readonly VITE_OIDC_ISSUER: string;
  readonly VITE_OIDC_SCOPES: string;

  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'reveal.js-mermaid-plugin';
