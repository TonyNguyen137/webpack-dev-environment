const path = require('node:path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const glob = require('glob');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  console.log('env: ', env);
  console.log('argv: ', argv);

  return merge(common, {
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'public/[name].[contenthash:6].min.js',
      clean: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: (pathData) => {
          return pathData.chunk.name === 'index'
            ? 'public/style.[contenthash:6].min.css'
            : 'public/[name].[contenthash:6].min.css';
        },
      }),

      new HTMLInlineCSSWebpackPlugin({
        filter(fileName) {
          console.log('fileName : ', fileName);
          return fileName.includes('critical');

          // return fileName.includes('main');
        },
      }),

      // new CopyPlugin({
      //   patterns: [{ from: 'src/assets/test' }],
      // }),

      new PurgeCSSPlugin({
        paths: glob.sync(`./index.html`, { nodir: true }),
        // safelist: {
        //   standard: [/aria/, /data/],
        //   deep: [/aria/, /data/, /^.*\[/],
        //   greedy: [/aria/, /data/, /^.*\[/],
        // },
      }),
    ],
    module: {
      rules: [
        // 1. sass-loader compiles Sass to CSS,
        // 2. css-loader resolves @import and url() like import/require()
        // css-loader loads the CSS file,
        // 3. style-loader injects CSS into the DOM
        // 4. MiniCssExtractPlugin.loader extracts CSS into separate files
        // fixed order [MiniCssExtractPlugin/'style-loader', 'css-loader', 'sass-loader']
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.scss$/i,

          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',

            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    // [
                    //   'postcss-preset-env',
                    //   {
                    //     stage: 3,
                    //     features: {
                    //       // 'nesting-rules': true,
                    //       // clamp: true,
                    //       'custom-properties': false,
                    //     },
                    //   },
                    // ],
                    ['postcss-sort-media-queries'],
                  ],
                },
              },
            },
            'sass-loader',
          ],
        },

        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    optimization: {
      // minimize: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
  });
};
