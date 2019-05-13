<template>
  <header class="app-header navbar">
    <SidebarToggler class="d-lg-none" display="md" mobile />
    <b-link class="navbar-brand" to="#">
      <img class="navbar-brand-full" src="/images/logo.png" height="30" alt="CoreUI Logo">
      <img class="navbar-brand-minimized" src="/images/logo.png" height="30" alt="CoreUI Logo">
    </b-link>
    <SidebarToggler class="d-md-down-none" display="lg" />
    <b-navbar-nav class="d-md-down-none">
      <b-nav-item class="px-3" to="/">Dashboard</b-nav-item>
      <b-nav-item class="px-3" to="/customers" exact>Customers</b-nav-item>
      <b-nav-item class="px-3">Settings</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item class="d-md-down-none">
        <i class="icon-bell"></i>
        <b-badge pill variant="danger">5</b-badge>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-list"></i>
      </b-nav-item>
      <b-nav-item class="d-md-down-none">
        <i class="icon-location-pin"></i>
      </b-nav-item>
      <DropdownAccount/>
    </b-navbar-nav>
    <AsideToggler class="d-none d-lg-block" />
    <!--<AsideToggler class="d-lg-none" mobile />-->
  </header>
</template>

<script>
  import SidebarToggler from './SidebarToggler.vue'
  import AsideToggler from './AsideToggler.vue'
  import DropdownAccount from './DropdownAccount.vue'

  export default {
    name: 'DefaultHeader',
    components: {
      SidebarToggler,
      AsideToggler,
      DropdownAccount
    },
    props: {
      fixed: {
        type: Boolean,
        default: false
      }
    },
    computed: {
    },
    mounted: function () {
      this.isFixed(this.fixed)
    },
    methods: {
      isFixed (fixed) {
        fixed ? document.body.classList.add('header-fixed') : document.body.classList.remove('header-fixed')
        return fixed
      }
    }
  }
</script>
