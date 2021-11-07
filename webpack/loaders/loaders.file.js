const ImgLoader = {
  test: /\.(png|jpg|svg|gif)$/,
  use: ['file-loader'],
};

const XMLLoader = {
  test: /\.xml$/,
  use: ['xml-loader'],
};

const CSVLoader = {
  test: /\.csv$/,
  use: ['csv-loader'],
};

module.exports = {
  loadersFile: [ImgLoader, XMLLoader, CSVLoader],
};
