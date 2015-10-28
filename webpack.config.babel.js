/**
 * Created by AshZhang on 15/10/14.
 */


'use strict';

var path = require('path'),
    webpack = require('webpack'),
    CleanPlugin = require('clean-webpack-plugin'),
    HTMLPlugin = require('html-webpack-plugin'),
    ROOT_PATH = path.resolve(__dirname),
    TARGET = process.env.npm_lifecycle_event,
    template = new HTMLPlugin({
      template: './src/index.tpl'
    });

if (TARGET === 'start' || TARGET === 'dev') {
  console.log(TARGET);
  module.exports = {
    devServer: {
      colors: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    devtool: 'eval-source-map',
    entry: path.resolve(ROOT_PATH, './src/app.jsx'),
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['react-hot', 'babel'],
          include: path.resolve(ROOT_PATH, 'src')
        }
      ]
    },
    plugins: [
      template,
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };
}

if (TARGET === 'build') {

  module.exports = {
    devtool: 'source-map',
    entry: {
      app: path.resolve(ROOT_PATH, 'src/app.jsx'),
      libs: ['react', 'react-dom']
    },
    output: {
      path: path.resolve(ROOT_PATH, 'build'),
      filename: 'app.[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: path.resolve(ROOT_PATH, 'src')
        }
      ]
    },
    plugins: [
      template,
      new CleanPlugin(['build']),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        'libs',
        'libs.[chunkhash].js'
      ),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  };
}