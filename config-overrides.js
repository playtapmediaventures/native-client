/* eslint no-param-reassign: 0 */
module.exports = (config, env) => {
  config.output.filename = 'bundle.js';
  delete config.devtool;

  return config;
};
