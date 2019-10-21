<template>
  <div class="sidebar" v-on-clickaway="hideMobile">
    <SidebarHeader/>
    <SidebarForm/>
    <SidebarNav :navItems="nav"></SidebarNav>
    <SidebarFooter/>
    <SidebarMinimizer/>
  </div>
</template>

<script>
  import { mixin as clickaway } from 'vue-clickaway'
  import { hideMobile } from '@/mixins/hideMobile'
  import nav from '@/shared/menu'

  import SidebarHeader from './SidebarHeader.vue'
  import SidebarForm from './SidebarForm.vue'
  import SidebarFooter from './SidebarFooter.vue'
  import SidebarMinimizer from './SidebarMinimizer.vue'
  import SidebarNav from './Nav/SidebarNav.vue'

  export default {
    name: 'DefaultSidebar',
    props: {
      fixed: {
        type: Boolean,
        default: false
      }
    },
    mixins: [ clickaway, hideMobile ],
    components: {
      SidebarHeader,
      SidebarForm,
      SidebarNav,
      SidebarFooter,
      SidebarMinimizer
    },
    data() {
      return {
        nav: nav.children
      }
    },
    mounted: function () {
      this.isFixed()
    },
    methods: {
      isFixed () {
        this.fixed ? document.body.classList.add('sidebar-fixed') : document.body.classList.remove('sidebar-fixed')
        return this.fixed
      }
    }
  }
</script>
