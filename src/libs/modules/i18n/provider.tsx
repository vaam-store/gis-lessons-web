import { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { useInitHook } from './init-hook';

export default function AppI18nProvider({ children }: PropsWithChildren) {
  const { i18n, loading, error } = useInitHook();
  if (loading) return null;
  if (error) throw error as Error;
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
