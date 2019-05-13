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
  },
  firebase = {
    API_KEY: process.env.FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: process.env.FIREBASE_APP_ID
  }
};
