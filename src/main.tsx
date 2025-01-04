import '@mod/tracing';
import './index.scss';

import { AuthProvider, SilentLogin } from '@mod/auth';
import { i18nFn } from '@mod/i18n';
import Notification from '@mod/notification';
import QueryWrapper from '@mod/query';
import RouterProvider from '@mod/router';
import Versioning from '@mod/versioning';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { I18nextProvider } from 'react-i18next';

async function main() {
  const i18n = await i18nFn();

  const container = document.getElementById('root')!;
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <AuthProvider>
          <QueryWrapper>
            <SilentLogin />
            <Versioning />
            <Helmet
              titleTemplate='%s | GIS Lessons'
              defaultTitle='GIS Lessons'
            />
            <RouterProvider />
            <Notification />
          </QueryWrapper>
        </AuthProvider>
      </I18nextProvider>
    </StrictMode>,
  );
}

main().catch(console.error);
