/* eslint no-param-reassign: 0 */

module.exports = config => {
  config.output.filename = 'msclvr-native.min.js';

  delete config.optimization.splitChunks;
  delete config.optimization.runtimeChunk;

  return config;
};
