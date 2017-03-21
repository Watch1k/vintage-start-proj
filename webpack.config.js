'use strict';

const webpack = require('webpack');
const path = require('path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const ChunkManifestPlugin = require('chunk-manifest-webpack2-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

module.exports = {

  // входящая точка
  entry: {
    'js/index': './src/js/index'
  },

  // настройки вывода файлов
  output: {
    path: path.resolve(__dirname, 'www'),
    publicPath: './',
    filename: '[name].bundle.js',
    chunkFilename: 'js/chunks/[name]-[hash].js'
  },

  // плагины вебпака
  plugins: [
    new WebpackMd5Hash(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),

    new webpack.NoEmitOnErrorsPlugin(),

    new WebpackAssetsManifest({
      output: 'webpack-assets-manifest.json',
      replacer: null,
      space: 2,
      writeToDisk: false,
      sortManifest: true,
      merge: false,
      publicPath: '',
      done: manifest => {
        console.log(`The manifest has been written to ${manifest.getOutputPath()}`);
      }
    }),

    new ChunkManifestPlugin({
      filename: 'webpack-chunk-manifest.json',
      manifestVariable: 'webpackManifest'
    })
  ],

  // настройки загрузки модулей (пути к файлам, пути по умолчанию)
  resolve: {
    extensions: ['.js'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  },

  module: {
    // загрузчики файлов
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, path.resolve(__dirname, 'src/js/modules/dep')],
        options: {
          presets: ['es2015', 'stage-2']
        }
    }]
  }
};