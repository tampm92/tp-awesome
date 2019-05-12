# Add config

## Install lib

```bash
yarn add @nuxtjs/dotenv
```

## Setup

- Create file `.env` with content

```bash
#
# APPLICATION
#
APP_NAME=development
```

- Create file `.env.production` with content

```bash
#
# APPLICATION
#
APP_NAME=production
```

- Add config to `nuxt.config.js`

```bash
/**
 * Load .env file or .env.[NODE_ENV] file.
 */
const NODE_ENV = process.env.NODE_ENV;
let fileNameEnv = '';
if (!!!NODE_ENV || NODE_ENV === 'development') {
  fileNameEnv = '.env';
} else {
  fileNameEnv = `.env.${NODE_ENV}`;
}

export default {
  modules: [
    'bootstrap-vue/nuxt',
    [ '@nuxtjs/dotenv', { filename: fileNameEnv } ]
  ]
}
```

## Use

- Create file `env.js` in folder `~/shared` with content

```bash
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
```

- Use:

```bash
import env from '~/shared/env.js'

console.log(env.app);
```

## Use in nuxt.config.js

- The dotenv-module won't overload the environment variables of the process running your build.

- If you need to use variables from your .env file at this moment

```bash
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), fileNameEnv) });

export default {
  head: {
    title: process.env.APP_NAME,
  }
}
```