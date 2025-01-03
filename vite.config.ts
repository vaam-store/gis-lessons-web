import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { Buffer } from 'buffer';
import { defineConfig } from 'vite';
import bundlesize from 'vite-plugin-bundlesize';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { VitePWA } from 'vite-plugin-pwa';
import { robots } from 'vite-plugin-robots';
import tsconfigPaths from 'vite-tsconfig-paths';

const base64Encode = (plaintext: string): string => {
  return Buffer.from(plaintext).toString('base64');
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    bundlesize({
      limits: [
        {
          name: '**/*.js',
          limit: 300_000, // 250.0KB
        },
      ],
    }),
    tsconfigPaths(),
    ViteMinifyPlugin({}),
    legacy({
      targets: ['defaults'],
    }),
    robots(),
    webUpdateNotice({
      logVersion: true,
      versionType: 'build_timestamp',
      hiddenDefaultNotification: true,
    }),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'Frontend App Test',
        short_name: 'Frontend',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5_000_000,
      },
    }),
  ],
  server: {
    proxy: {
      '/misc/tp': {
        target: 'http://localhost:4318',
        rewrite: (path) => path.replace('/misc/tp', '/v1/traces'),
      },
    },
  },
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1_600, // 1.6KB
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (/project-env-variables.ts/.test(id)) {
            return 'project-env-variables';
          }

          if (id.includes('node_modules')) {
            const cleanName = id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString();
            return cleanName + '-' + base64Encode(cleanName);
          }
        },
        chunkFileNames: 'assets/chunks/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
      },
    },
  },
});