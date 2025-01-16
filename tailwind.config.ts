import basePreset from '@vymalo/ui-preset';
import { merge } from 'lodash';
import type { Config } from 'tailwindcss';

export default merge({}, basePreset, {
  content: [
    './src/**/*.{html,ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
}) satisfies Config;
