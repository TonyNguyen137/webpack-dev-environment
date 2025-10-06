/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    require('postcss-sort-media-queries')({
      sort: 'mobile-first',
    }),
    require('postcss-preset-env')({
      stage: 3,
      //   features: { 'custom-properties': false },
    }),
  ],
};

module.exports = config;
