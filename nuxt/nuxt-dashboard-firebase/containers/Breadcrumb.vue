<template>
  <ol class="breadcrumb">
    <li v-for="(item, index) in crumbs" class="breadcrumb-item" :key="index">
      <nuxt-link :to="item.url" :class="item.active ? 'active' : ''">{{ item.name }}</nuxt-link>
    </li>
  </ol>
</template>

<script>
const breadcrumbs = {
  path: "",
  name: "Dashboard",
  children: [
    {
      path: "/users",
      name: "Users",
      children: [{
        path: "/users/add",
        name: "Add"
      }]
    }, {
      path: "/customers",
      name: "Customers",
      children: [{
        path: "/customers/add",
        name: "Add"
      },{
        path: "/customers/:slug",
        name: "Review"
      }]
    }
  ]
};

import nav from '~/shared/menu';

export default {
  name: "c-breadcrumb",
  computed: {
    crumbs() {
      let crumbs = [];
      let currentPath = this.getMatchedPath();

      function deep(value) {
        if (value.url === currentPath){
          crumbs.unshift({
            name: value.name,
            url: value.url,
            active: true
          })
          return true;
        }

        if (value.children) {
          for (const child of value.children) {
            var data = deep(child);
            if (data) {
              crumbs.unshift({
                name: value.name,
                url: value.url
              });
              return true;
            }
          }
        }

        return false;
      };

      deep(nav);

      return crumbs;
    }
  },
  methods: {
    getMatchedPath() {
      let matched = this.$route.matched;
      if (matched && matched.length) {
        return matched[0].path
      }

      return '';
    }
  }
};
</script>

<style lang="scss">
.breadcrumb {
  .breadcrumb-item {
    .active {
      color: #000;
      text-decoration: none;
      cursor: default;
    }
  }
}
</style>
