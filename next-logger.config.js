// next-logger.config.js
const pino = require('pino');

const logger = (defaultConfig) =>
  pino({
    ...defaultConfig,
    // mixin: () => ({ name: 'pino-logger' }),
  });

module.exports = {
  logger,
};
