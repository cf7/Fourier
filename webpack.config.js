const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'Fourier/'),
  entry: {
    index: [path.join(__dirname, 'client/index.js')],
    about: [path.join(__dirname, 'client/about.js')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|server.js|\.test\.js)/,
        use: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [ 
          {
            loader: "style-loader",
          },
          { 
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'client/template.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body',
      title: 'Fourier',
    }),
    new HTMLWebpackPlugin({
      template: path.join(__dirname, 'client/template.html'),
      filename: 'about.html',
      chunks: ['about'],
      inject: 'body',
      title: 'Fourier',
    }),
    // new MiniCSSExtractPlugin(),
  ],
  
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build/'),
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: 'single',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'client/'),
      publicPath: '/'
    },
    client: {
      logging: 'verbose',
      overlay: true
    },
    hot: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }
};