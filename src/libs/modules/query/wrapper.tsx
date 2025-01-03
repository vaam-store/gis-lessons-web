import {
  asyncStoragePersister,
  queryClient,
} from '@/libs/modules/query/client.ts';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { PropsWithChildren } from 'react';

export default function QueryWrapper({ children }: PropsWithChildren) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
      onSuccess={() => console.log('QueryClient rehydrated')}>
      {children}
      <ReactQueryDevtools buttonPosition='bottom-right' />
    </PersistQueryClientProvider>
  );
}
