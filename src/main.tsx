import '@fontsource/roboto/400.css';
import '@mod/tracing';
import './index.scss';

import { i18nFn } from '@mod/i18n';
import Notification from '@mod/notification';
import QueryWrapper from '@mod/query';
import { router } from '@mod/router';
import Versioning from '@mod/versioning';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import { RouterProvider } from 'react-router-dom';

async function main() {
  const i18n = await i18nFn();

  const container = document.getElementById('root')!;
  createRoot(container).render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <QueryWrapper>
          <Versioning />
          <Helmet titleTemplate='%s | GIS Lessons' defaultTitle='GIS Lessons' />
          <RouterProvider router={router} />
          <Notification />
        </QueryWrapper>
      </I18nextProvider>
    </StrictMode>,
  );
}

main().catch(console.error);
