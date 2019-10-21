<template>
  <div class="app">
    <Loading :loading="isLoading"/>
    <DefaultHeader fixed/>
    <div class="app-body">
      <DefaultSidebar fixed/>
      <main class="main">
        <Breadcrumb/>
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
  import {
    mapState,
    mapActions
  } from "vuex";
  import { cBreadcrumb } from '@/components'
  import {
    DefaultAside,
    DefaultHeader,
    DefaultFooter,
    DefaultSidebar,
    Loading,
    Breadcrumb
  } from '@/containers'

  export default {
    name: 'full',
    components: {
      Breadcrumb,
      DefaultAside,
      DefaultHeader,
      DefaultFooter,
      DefaultSidebar,
      Loading
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    }
  }
</script>
