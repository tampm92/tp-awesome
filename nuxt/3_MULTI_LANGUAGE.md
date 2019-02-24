# Add multiple languages

- Install lib:

```bash
yarn add nuxt-i18n
yarn add --dev webpack-requiredir
```

- add config to file nuxt.config.js

```bash
modules: [
    ['nuxt-i18n', {
        locales: CONFIG.locales,
    defaultLocale: 'en',
    vueI18n: {
            fallbackLocale: 'en'
        },
        lazy: true,
        langDir: 'locales/'
    }],
],
```

- Create file `en-US.js` folder `locales`

```bash
import requireDir from 'webpack-requiredir'
let en = requireDir(require.context('./en', true, /\.json$/))

export default en
```

- Create file `global.json` folder `locales/en`

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

- Using

```bash
# in component
this.$t('global.SEO.title')
# in view
{{$t('global.SEO.title')}}
```