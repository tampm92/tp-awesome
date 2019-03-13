'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = {
  getConfig: function getConfig(ENV) {
    var PROD_CONFIG = {
      NAME_BUILD: 'prod',
      API_BASE: 'https://api.bolide-nuxt-template-project.it'
    }

    var STAGING_CONFIG = {
      NAME_BUILD: 'stag',
      API_BASE: 'https://api.staging.bolide-nuxt-template-project.it'
    }

    var DEV_CONFIG = {
      NAME_BUILD: 'dev',
      API_BASE: 'http://127.0.0.1:3000'
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
