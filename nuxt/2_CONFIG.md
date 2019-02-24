# Add config

- Create file `index.js` in folder `config` with content:

```bash
'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

const ENV = process.env.NODE_ENV;

exports.default = {
  getConfig: function getConfig() {
    var PROD_CONFIG = {
      NAME_BUILD: 'Urban Sketch - Product',
      API_BASE_URL: 'https://snbrw5fvs0.execute-api.us-east-1.amazonaws.com/prod/'
    }

    var STAGING_CONFIG = {
      NAME_BUILD: 'Urban Sketch - Staging',
      API_BASE_URL: 'https://o5oqd2192h.execute-api.us-east-1.amazonaws.com/dev/'
    }

    var DEV_CONFIG = {
      NAME_BUILD: 'Urban Sketch - Dev',
      API_BASE_URL: 'https://o5oqd2192h.execute-api.us-east-1.amazonaws.com/dev/'
    }

    var CONFIG = void 0

    switch (ENV) {
      case 'production':
        CONFIG = PROD_CONFIG;
        break
      case 'staging':
        CONFIG = STAGING_CONFIG;
        break
      default:
        CONFIG = DEV_CONFIG;
        break
    }

    CONFIG.locales = [{
      code: 'en',
      name: 'ENG',
      iso: 'en-US',
      file: 'en-US.js'
    }]

    return CONFIG
  }
}

```

- Use config:

```bash
const CONFIG = require('./config').default.getConfig()
```