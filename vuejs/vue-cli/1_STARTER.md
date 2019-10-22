# Steps new project with Vue CLI

## Folder structure

```bash
.
├── public
  ├── assets
├── src
  ├── components
    ├── partials
  ├── layouts
  ├── plugins
  ├── router
  ├── services
  ├── store
  ├── views
  ├── api.js
  ├── App.vue
  ├── config.js
  ├── main.js
├── README.md
├── .env
├── .env.development
├── .env.production
├── vue.config.js
```

## Create project

- By command line

```bash
vue create tp-project

# choose Manually -> choose Router and Vuex
```

- By vue ui

```bash
vue ui
```

## Go to project folder

```bash
cd tp-project
```

## Run project on local with `development` mode

```bash
yarn serve
```

## Buld project with `production` mode

```bash
yarn build
```

## Add environment and config file

- Create file `.env` with content

```bash
VUE_APP_TITLE=TP Project
```

- Create file `.env.development` with content

```bash
VUE_APP

- Create file `.env.production` with content

```bash
VUE_APP_TITLE=TP Project (production)
```

## Create file `src/config.js` with content

```ts
export default {
    node: process.env.NODE_ENV || 'development',
    isTest: process.env.NODE_ENV === 'test',
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: !!!process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    appTitle: process.env.VUE_APP_TITLE
};
```

## Lauch web and test

- Change content in file `src/App.vue`

```html
<template>
  <div id="app">
    <h1>{{title}}</h1>
  </div>
</template>

<script>
import config from './config'

export default {
  name: 'app',
  data() {
    return {
      title: config.appTitle
    }
  },
}
</script>
```

- Run app

```bash
yarn serve
```
