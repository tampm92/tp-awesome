import pkg from './package'
import * as path from 'path';
import * as dotenv from 'dotenv';

/**
 * Load .env file or .env.[NODE_ENV] file.
 */
const NODE_ENV = process.env.NODE_ENV;
let fileNameEnv = '.env' + (!!!NODE_ENV || NODE_ENV === 'development' ? '' : `.${NODE_ENV}`);
dotenv.config({
  path: path.join(process.cwd(), fileNameEnv)
});

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: process.env.APP_NAME,
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
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#42b883',
    height: '5px',
    duration: 5000
  },

  /*
   ** Global CSS
   */
  css: [
    /* Import Font Awesome Icons Set */
    '~/node_modules/font-awesome/css/font-awesome.min.css',
    /* Import Simple Line Icons Set */
    '~/node_modules/simple-line-icons/css/simple-line-icons.css',
    /* Import Bootstrap Vue Styles */
    '~/node_modules/bootstrap-vue/dist/bootstrap-vue.css',
    /* Import Core SCSS */
    '~/assets/scss/global.scss'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/style-resources',
    'bootstrap-vue/nuxt',
    ['@nuxtjs/dotenv', {
      filename: fileNameEnv
    }]
  ],

  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss'
    ]
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
