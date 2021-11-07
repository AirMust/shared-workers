const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  };

  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ];

  loaders.push('eslint-loader');

  return loaders;
};

const JSLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: jsLoaders(),
};

const JSXLoader = {
  test: /\.jsx$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: babelOptions('@babel/preset-react'),
  },
};

const TSLoader = {
  test: /\.(ts|tsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: babelOptions('@babel/preset-typescript'),
  },
};
module.exports = {
  loadersSrc: [JSLoader, JSXLoader, TSLoader],
};
