import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ChainedBackend, { ChainedBackendOptions } from 'i18next-chained-backend';
import HttpApi, { HttpBackendOptions } from 'i18next-http-backend';
import LocalStorageBackend, {
  LocalStorageBackendOptions,
} from 'i18next-localstorage-backend';
import { filter, isObject } from 'lodash';
import { initReactI18next } from 'react-i18next';

const filterWell = <T>(list: T[]) => filter(list, isObject) as T[];

export async function i18nFn() {
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(ChainedBackend)
    .init<ChainedBackendOptions>({
      fallbackLng: 'en',
      ns: ['common'],
      defaultNS: ['common'],
      supportedLngs: ['en', 'fr'],
      interpolation: {
        escapeValue: false,
      },
      backend: {
        backends: filterWell([
          import.meta.env.PROD && LocalStorageBackend,
          HttpApi,
        ]),
        backendOptions: filterWell([
          import.meta.env.PROD &&
            ({
              expirationTime: 3 * (24 * 60 * 60 * 1000), // 3 days
            } as LocalStorageBackendOptions),
          {
            loadPath: '/i18n/{{lng}}/{{ns}}.json',
            request: async (_, url, __, callback) => {
              try {
                const { data, status } = await fetch(url).then(
                  async (response) => ({
                    status: response.status,
                    data: await response.json(),
                  }),
                );

                callback(null, { status, data });
              } catch (error) {
                callback(error, { status: 500, data: {} });
              }
            },
          } as HttpBackendOptions,
        ]),
      },
    });
  return i18n;
}
