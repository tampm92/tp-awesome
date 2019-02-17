<template>
  <footer class="app-footer">
    <div>
      <a href="https://coreui.io">CoreUI</a>
      <span class="ml-1">&copy; 2018 creativeLabs.</span>
    </div>
    <div class="ml-auto">
      <span class="mr-1">Powered by</span>
      <a href="https://coreui.io">CoreUI for Vue</a>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'DefaultFooter',
    components: {
    },
    props: {
      fixed: {
        type: Boolean,
        default: false
      }
    },
    mounted: function () {
      this.isFixed()
    },
    methods: {
      isFixed () {
        this.fixed ? document.body.classList.add('footer-fixed') : document.body.classList.remove('footer-fixed')
      }
    }
  }
</script>
