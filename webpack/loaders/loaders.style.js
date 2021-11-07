const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssLoaders = (extra) => {
  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['postcss-preset-env'],
        },
      },
    },
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const CssLoader = {
  test: /\.css$/,
  use: cssLoaders(),
};

const LessLoader = {
  test: /\.less$/,
  use: cssLoaders('less-loader'),
};

const SassLoader = {
  test: /\.s[ac]ss$/,
  use: cssLoaders('sass-loader'),
};

module.exports = {
  loadersStyle: [CssLoader, LessLoader, SassLoader],
};
