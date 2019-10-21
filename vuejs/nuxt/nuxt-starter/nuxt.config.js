const pkg = require('./package')
const CONFIG = require('./config').default.getConfig(process.env.NODE_ENV)

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      },
    ],
    link: [{
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Playball%7CBitter'
    }, ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },

  /*
   ** Global CSS
   */
  css: [
    /* Import Core SCSS */
    {
      src: '~/assets/scss/index.scss',
      lang: 'scss'
    }
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/bootstrap-vue',
  ],

  /*
   ** Nuxt.js modules
   */
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

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {

    }
  }
}
