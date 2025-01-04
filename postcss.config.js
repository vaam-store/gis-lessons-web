/**
 * PostCSS configuration file
 * @type {import('postcss-load-config').Config}
 */
export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': 'postcss-nesting',
    cssnano: {},
    autoprefixer: {},
    tailwindcss: {},
  },
};
