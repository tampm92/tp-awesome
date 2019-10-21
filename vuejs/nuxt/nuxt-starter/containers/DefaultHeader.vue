<template>
  <header id="DefaultHeader">
		<div class="container">
      <b-navbar toggleable="md" type="dark">
        <a class="logo" href="#"><img src="/images/logo-white.png" alt="Logo"></a>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto main-menu">
            <b-nav-item href="/">HOME</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
		</div>
	</header>
</template>

<script>
  export default {
    name: 'DefaultHeader',
    components: {
    },
    props: {
    },
    computed: {
    },
    mounted: function () {
    },
    methods: {
    }
  }
</script>
