const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('fonts path: ', path.resolve(__dirname, 'src', 'assets', 'fonts'));

module.exports = {
  entry: { index: './index.js' },
  stats: {
    // enables scss @debug
    loggingDebug: ['sass-loader'],
  },
  resolve: {
    alias: {
      '@fonts': path.resolve(__dirname, 'src', 'assets', 'fonts'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'testing',
      filename: 'index.html',
      template: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'public/[name][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|avif|svg|webp)$/i,
        type: 'asset', // Automatically chooses between inline/resource
        generator: {
          filename: 'public/[name][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024, // 4kb - files smaller will be inlined
          },
        },
      },

      {
        test: /sprite\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'public/[name].[contenthash:6][ext]',
        },
      },
    ],
  },
};
