import basePreset from '@vymalo/ui-preset';
import { merge } from 'lodash';
import type { Config } from 'tailwindcss';

export default merge({}, basePreset, {
  content: [
    './src/**/*.{html,ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...basePreset.theme.extend.fontFamily.sans],
        mono: ['Roboto', ...basePreset.theme.extend.fontFamily.mono],
      },
    },
  },
}) satisfies Config;
