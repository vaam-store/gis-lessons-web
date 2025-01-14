import { getUserStatic } from '@mod/auth';
import { getProjectEnvVariables } from '@mod/env';
import { baseStore } from '@mod/storage';
import { client } from '@openapi/requests';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { del, get, set } from 'idb-keyval';

const { envVariables } = getProjectEnvVariables();

client.setConfig({
  baseUrl: envVariables.VITE_BACKEND_URL,
  throwOnError: true,
});

client.interceptors.request.use((config) => {
  const user = getUserStatic();
  if (user) {
    config.headers.set('Authorization', `Bearer ${user.access_token}`);
  }
  return config;
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24 * 30, // 30 days
      retry: 3,
    },
    mutations: {
      retry: 3,
    },
  },
});

export const store = baseStore('queries');

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: {
    getItem: (key) => get(key, store),
    setItem: (key, value) => set(key, value, store),
    removeItem: (key) => del(key, store),
  },
  key: 'gis_lessons',
});