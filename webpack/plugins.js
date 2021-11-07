const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');

const dfPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
});

const htmlPlugin = new HTMLWebpackPlugin({
  template: path.join('public', 'index.html'),
});

const cleanPlugin = new CleanWebpackPlugin();

const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: path.join('public', 'favicon.ico'),
      to: path.resolve('build'),
    },
  ],
});

const minicssPlugin = new MiniCssExtractPlugin({
  filename: 'css/[name].bundle.css',
});

const eslintPlugin = new ESLintPlugin({
  extensions: ['js', 'jsx', 'ts', 'tsx'],
});

const plugins = () => {
  const base = [
    dfPlugin,
    htmlPlugin,
    copyPlugin,
    minicssPlugin,
    eslintPlugin,
    cleanPlugin,
  ];

  return base;
};

module.exports = { plugins: plugins() };
