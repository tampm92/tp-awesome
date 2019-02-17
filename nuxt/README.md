# TP Awesome Nuxt

[The topic use this template](https://github.com/coreui/coreui-free-vue-admin-template)

![Schema](https://nuxtjs.org/nuxt-schema.svg)

## Starter project

1. Create project

```bash
yarn create nuxt-app <project-name>
yarn run dev
```

- Create file `style.scss` in folder `assets/scss`

- Config style: SCSS, Bootstrap, Bootstrap Vue

```bash
# install libs
yarn add sass-loader
yarn add node-sass
yarn add bootstrap-vue
# add config to file nuxt.config.js
modules: [
    'bootstrap-vue/nuxt'
],
css: [
    /* Import Bootstrap Vue Styles */
    '~/node_modules/bootstrap-vue/dist/bootstrap-vue.css',
    /* Import Core SCSS */
    { src: '~/assets/scss/style.scss', lang: 'scss' }
],
```

2. Cross platform setting of environment

- Install lib:

```bash
yarn add cross-env
```

- Add script in file `package.json`

```bash
"scripts": {
    "build": "cross-env NODE_ENV=staging nuxt build",
    "start": "cross-env NODE_ENV=staging nuxt start",
    "build-prod": "cross-env NODE_ENV=production nuxt build",
    "start-prod": "cross-env NODE_ENV=production nuxt start",
},
```

- Default NODE_ENV = development

3. Add config

- Create file `index.js` in folder `config` with content:

```bash
'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})

exports.default = {
  getConfig: function getConfig(ENV) {
    var PROD_CONFIG = {
    }

    var STAGING_CONFIG = {
    }

    var DEV_CONFIG = {
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

    return CONFIG
  }
}

```

4. Add multiple languages

- Install lib:

```bash
yarn add nuxt-i18n
yarn add --save webpack-requiredir
```

- Create file `en-US.js` folder `locales`

```bash
import requireDir from 'webpack-requiredir'
let en = requireDir(require.context('./en', true, /\.json$/))

export default en
```

- Create file `home.json` folder `locales/en`

```bash
{
    "SEO": {
        "title": "Tam Phan",
        "desc": "This is a nuxt-bolide-template project.",
        "keywords": "",
        "img": "/images/share/img-default.png"
    }
}
```

## Full dashboard project

- Install lib:

```bash
yarn add font-awesome
yarn add simple-line-icons
yarn add vue-clickaway
```

> Please see on `nuxt-dashboard-example` project