# TP Awesome Nuxt

## Starter project

- Create project

```bash
yarn create nuxt-app <project-name>
yarn run dev
```

## Documents

- [Nuxt PWA](https://pwa.nuxtjs.org/setup.html)

### Install libs

```bash
yarn add @nuxtjs/pwa
```

### Update config to file nuxt.config.js

```bash
modules: [
    '@nuxtjs/pwa',
],
manifest: {
    name: 'TP-Demo Nuxt',
    short_name: 'TP',
    lang: 'en',
    description: 'TP-Demo Nuxt',
    theme_color: '#188269',
    background_color: '#000',
    ogImage: `https://live.staticflickr.com/65535/48992121062_769c357412_o.png`
},
```

> Ensure static dir exists and optionally create static/icon.png. (Recommended to be square png and >= 512x512px)

## More TIPs

> See other file `*.md`
