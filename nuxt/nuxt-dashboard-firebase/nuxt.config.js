import pkg from './package'
import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * Load .env file or .env.[NODE_ENV] file.
 */
const NODE_ENV = process.env.NODE_ENV;
let fileNameEnv = '';
if (!!!NODE_ENV || NODE_ENV === 'development') {
  fileNameEnv = '.env';
} else {
  fileNameEnv = `.env.${NODE_ENV}`;
}
dotenv.config({ path: path.join(process.cwd(), fileNameEnv) });

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: process.env.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/style.scss', lang: 'scss' }
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    [ '@nuxtjs/dotenv', { filename: fileNameEnv } ]
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
