# TP Awesome Nuxt

> This awesome is using Tailwind CSS

## Starter project

- Create project

```bash
yarn create nuxt-app <project-name>
yarn run dev
```

## Documents

- [Tailwind Css](https://tailwindcss.com/docs/installation)
- [Style Resources Module](https://github.com/nuxt-community/style-resources-module)

## Install libs

```bash
yarn add sass-loader node-sass @nuxtjs/style-resources
yarn add @nuxtjs/tailwindcss
```

## Add files

- Create files in folder `assets/scss`
    + `global.scss`
    + `_variables.scss`
    + `_mixins.scss`

- Create file `assets/scss/tailwind.scss`

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

- Create file `tailwind.config.js`

```ts
module.exports = {
    theme: {},
    variants: {},
    plugins: []
}
```

## Update config to file nuxt.config.js

```bash
loading: {
    color: '#42b883',
    height: '5px',
    duration: 10000
},
css: [
    '~/assets/scss/tailwind.scss',
    '~/assets/scss/global.scss',
],
modules: [
    '@nuxtjs/style-resources',
],
styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss',
    ]
},
build: {
    extend (config, ctx) {
    },
    postcss: {
        plugins: {
            tailwindcss: {
                configPath: '~/tailwind.config.js',
                cssPath: '~/assets/scss/tailwind.scss'
            }
        },
    }
}
```

## More TIPs

> See other file `*.md`
