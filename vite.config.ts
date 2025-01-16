import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import basex from 'base-x';
import { Buffer } from 'buffer';
import { defineConfig } from 'vite';
import bundlesize from 'vite-plugin-bundlesize';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { VitePWA } from 'vite-plugin-pwa';
import { robots } from 'vite-plugin-robots';
import tsconfigPaths from 'vite-tsconfig-paths';

const baseEncode = (plaintext: string): string => {
  const base =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-'._~!$&()*+,;=:@";
  const converter = basex(base);
  return converter.encode(Buffer.from(plaintext));
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    bundlesize({
      limits: [
        {
          name: '**/*.js',
          limit: 500_000,
        },
      ],
    }),
    tsconfigPaths(),
    ViteMinifyPlugin({}),
    legacy({
      targets: ['defaults'],
      modernPolyfills: true,
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
        name: 'GIS Lessons',
        short_name: 'GISchool',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'images/pwa-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'images/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'images/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'images/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'images/maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5_000_000,
      },
    }),
  ],
  server: {
    proxy: {
      '/rest': {
        target: 'http://localhost:4010',
        rewrite: (path) => path.replace('/rest', '/'),
      },
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
            return baseEncode(cleanName);
          }
        },
        chunkFileNames: 'assets/chunks/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash][extname]',
      },
    },
  },
});
