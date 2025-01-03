import { ThemeType } from './types.ts';

export const defaultTheme: ThemeType = 'vymalo-light';

export const themes: Record<'dark' | 'light', ThemeType> = {
  dark: 'vymalo-dark',
  light: 'vymalo-light',
};

export const themeKey = 'theme';
