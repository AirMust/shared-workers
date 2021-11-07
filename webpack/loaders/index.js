const { loadersSrc } = require('./loaders.src');
const { loadersStyle } = require('./loaders.style');
const { loadersFile } = require('./loaders.file');

module.exports = {
  loaders: [...loadersStyle, ...loadersSrc, ...loadersFile],
};
