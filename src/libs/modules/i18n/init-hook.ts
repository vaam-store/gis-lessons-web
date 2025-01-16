import type { i18n } from 'i18next';
import { useEffect, useState } from 'react';

type InitHook =
  | {
      i18n: null;
      error: null;
      loading: true;
    }
  | {
      i18n: i18n;
      error: null;
      loading: false;
    }
  | {
      i18n: null;
      error: object;
      loading: false;
    };

export function useInitHook(): InitHook {
  const [i18n, setI18n] = useState<i18n | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('@mod/i18n/i18n')
      .then(async ({ i18nFn }) => {
        const i18n = await i18nFn();
        setI18n(i18n);
        setLoading(false);
      })
      .catch(setError);
  }, []);

  return { i18n, error, loading } as InitHook;
}
