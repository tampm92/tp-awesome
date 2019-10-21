<template>
  <div class="app">
    <DefaultHeader/>
    <nuxt :class="'container-page page-' + $route.name"/>
    <DefaultFooter/>
  </div>
</template>

<script>
  import {
    DefaultHeader,
    DefaultFooter
  } from '@/containers'

  export default {
    name: 'full',
    components: {
      DefaultHeader,
      DefaultFooter
    },
    head() {
      return {
        title: this.$store.state.siteInfo.siteName,
        meta: [
          { hid: 'description', name: 'description', content: this.$store.state.siteInfo.siteDescription },
          { hid: 'og:title', name: 'og:title', content: this.$t('global.SEO.title') },
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: this.$store.state.siteInfo.siteIcon }
        ]
      };
    },
    data() {
      return {
      }
    },
    created() {
    },
    computed: {
    }
  }
</script>
