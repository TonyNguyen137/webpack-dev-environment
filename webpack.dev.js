const path = require('node:path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
console.log('static: ', path.join(__dirname, 'src', 'demos'));

module.exports = (env, argv) => {
  return merge(common, {
    mode: 'development',
    devtool: 'source-map',
    // output: {
    //   path: path.resolve(__dirname, 'dist'),
    //   filename: 'public/[name].min.js',
    // },

    // plugins: [
    //   // new HtmlWebpackPlugin({
    //   //   title: 'testing',
    //   //   filename: 'index.html',
    //   //   template: './src/index.html',
    //   // }),
    //   // new MiniCssExtractPlugin({
    //   //   filename: (pathData) => {
    //   //     return pathData.chunk.name === 'index' ? 'public/style.min.css' : 'public/[name].min.css';
    //   //   },
    //   // }),
    // ],
    module: {
      // 1. sass-loader compiles Sass to CSS,
      // 2. css-loader resolves @import and url() like import/require()
      // css-loader loads the CSS file,
      // 3. style-loader injects CSS into the DOM
      // 4. MiniCssExtractPlugin.loader extracts CSS into separate files
      // fixed order: [MiniCssExtractPlugin.loader/"style-loader", "css-loader", "sass-loader"],
      rules: [
        {
          test: /\.css$/i,

          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'src', 'demos'),
        publicPath: '/demos',
      },
      compress: true,
      port: 9000,
    },
  });
};
