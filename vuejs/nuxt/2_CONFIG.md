# Add config

> [@nuxtjs/dotenv](https://github.com/nuxt-community/dotenv-module)

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
import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * Load .env file or .env.[NODE_ENV] file.
 */
const NODE_ENV = process.env.NODE_ENV;
let fileNameEnv = '.env' + (!!!NODE_ENV || NODE_ENV === 'development' ? '' : `.${NODE_ENV}`);
dotenv.config({
  path: path.join(process.cwd(), fileNameEnv)
});

# add module
modules: [
  ['@nuxtjs/dotenv', {
    filename: fileNameEnv
  }]
],
```

## Use

- Create file `config.js` in folder `~/shared` with content

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
  appName: process.env.APP_NAME
};
```

- Use:

```bash
import config from '~/shared/config.js'

console.log(config.app);
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
