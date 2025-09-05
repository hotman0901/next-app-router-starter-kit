/* eslint-disable @typescript-eslint/no-require-imports */
// next-logger.config.js
const pino = require('pino');

// const logger = (defaultConfig) =>
//   pino({
//     ...defaultConfig,
//     // mixin: () => ({ name: 'pino-logger' }),
//   });

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino({
  level: isProduction ? 'level' : 'debug',
  browser: {
    asObject: true,
    write: (o) => {
      console.log(JSON.stringify(o));
    },
  },
  // Configure for both environments without worker threads
  transport: {
    target: isProduction ? 'pino' : 'pino-pretty',
    options: {
      colorize: !isProduction,
      // translateTime: 'SYS:standard',
      // ignore: 'pid,hostname',
    },
  },
});

module.exports = {
  logger,
};
