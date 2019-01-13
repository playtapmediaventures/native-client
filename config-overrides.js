/* eslint no-param-reassign: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (config, env) => {
  config.output.filename = 'msclvr-native.min.js';
  delete config.optimization.splitChunks;
  delete config.optimization.runtimeChunk;

  config.plugins.push(
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    })
  );

  return config;
};
