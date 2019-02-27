<template>
  <div class="app">
    <DefaultHeader fixed/>
    <div class="app-body">
      <DefaultSidebar fixed/>
      <main class="main">
        <c-breadcrumb :list="list" />
        <div class="container-fluid">
          <nuxt :class="'container-page page-' + $route.name"/>
        </div>
      </main>
      <DefaultAside fixed/>
    </div>
    <DefaultFooter/>
  </div>
</template>

<script>
  import { cBreadcrumb } from '@/components'
  import {
    DefaultAside,
    DefaultHeader,
    DefaultFooter,
    DefaultSidebar
  } from '@/containers'

  export default {
    name: 'full',
    components: {
      cBreadcrumb,
      DefaultAside,
      DefaultHeader,
      DefaultFooter,
      DefaultSidebar
    },
    head () {
      return {
        title: this.$t('global.SEO.title')
      }
    },
    data() {
      return {
      }
    },
    computed: {
      list() {
        return this.$route.matched.filter((route) => route.name || route.meta.label)
      }
    }
  }
</script>
