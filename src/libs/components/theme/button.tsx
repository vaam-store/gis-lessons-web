import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from 'react-daisyui';
import { Moon, Sun } from 'react-feather';
import { themeChange } from 'theme-change';
import { ThemeType } from './types';
import { calculateNextTheme, loadTheme, saveTheme } from './utils';

export interface ThemeToggleProps {
  responsive?: boolean;
}

export default function ThemeToggle({ responsive = true }: ThemeToggleProps) {
  const [theme, setTheme] = useState<ThemeType>(loadTheme);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    themeChange(false);
    // 👆 false parameter is required for react project
  }, []);

  const nextTheme = useMemo(() => calculateNextTheme(theme), [theme]);

  const onChange = useCallback(() => {
    setTheme((prev) => calculateNextTheme(prev));
  }, []);

  return (
    <Button
      size='sm'
      shape='circle'
      responsive={responsive}
      data-set-theme={nextTheme}
      onClick={onChange}
      data-click-track-event='theme-toggle'>
      {/* sun icon */}
      {theme === 'vymalo-light' && <Sun className='h-6 w-6' />}

      {/* moon icon */}
      {theme === 'vymalo-dark' && <Moon className='h-6 w-6' />}
    </Button>
  );
}
