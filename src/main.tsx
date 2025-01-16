import '@mod/tracing';
import './index.scss';

import DefaultHead from '@comp/helmet';
import { AuthProvider, SilentLogin } from '@mod/auth';
import AppI18nProvider from '@mod/i18n';
import Notification from '@mod/notification';
import QueryWrapper from '@mod/query';
import RouterProvider from '@mod/router';
import Versioning from '@mod/versioning';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function main() {
  const container = document.getElementById('root')!;
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <AppI18nProvider>
        <AuthProvider>
          <QueryWrapper>
            <SilentLogin />
            <Versioning />
            <DefaultHead />
            <RouterProvider />
            <Notification />
          </QueryWrapper>
        </AuthProvider>
      </AppI18nProvider>
    </StrictMode>,
  );
}

main();
