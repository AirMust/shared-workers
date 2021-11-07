const path = require('path');
const { loaders, plugins} = require('./webpack');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    filename: 'js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    open: true,
    port: 3000,
    historyApiFallback: true,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [...plugins],
  module: {
    rules: [...loaders],
  },
};
