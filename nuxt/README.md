# TP Awesome Nuxt

[The topic use this template](https://github.com/coreui/coreui-free-vue-admin-template)

![Schema](https://nuxtjs.org/nuxt-schema.svg)

## Starter project

- Create project

```bash
yarn create nuxt-app <project-name>
yarn run dev
```

- Create file `style.scss` in folder `assets/scss`

- Config style: SCSS, Bootstrap, [Bootstrap Vue](https://bootstrap-vue.js.org/docs/)

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
    /* Import Core SCSS */
    { src: '~/assets/scss/style.scss', lang: 'scss' }
],
```

## Full dashboard project

> Please see on `nuxt-dashboard-example` project