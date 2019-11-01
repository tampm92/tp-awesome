# TP Awesome Nuxt

> This awesome is using BootstrapVue

![Schema](https://nuxtjs.org/nuxt-schema.svg)

## Starter project

- Create project

```bash
yarn create nuxt-app <project-name>
yarn run dev
```

## Documents

- [Bootstrap Vue](https://bootstrap-vue.js.org/docs/)
- [Style Resources Module](https://github.com/nuxt-community/style-resources-module)

## Install libs

```bash
yarn add sass-loader node-sass @nuxtjs/style-resources
yarn add bootstrap-vue
```

## Add files

* Create files in folder `assets/scss`
    + `global.scss`
    + `_variables.scss`
    + `_mixins.scss`

## Udpdate config to file nuxt.config.js

```bash
css: [
    '~/assets/scss/global.scss'
],
modules: [
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
],
styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss'
    ]
}
```

## More TIPs

> See other file `*.md`