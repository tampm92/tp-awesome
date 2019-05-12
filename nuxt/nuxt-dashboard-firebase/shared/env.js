import * as pkg from '../package.json';

/**
 * Environment variables
 */
export default {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: !!!process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  app: {
    name: process.env.APP_NAME,
    version: pkg.version,
    description: pkg.description
  }
};
