# Vuetify

> Document [here](https://vuetifyjs.com/en/getting-started/quick-start)

## Install by Vue CLI

```bash
vue add vuetify

# ? Choose a preset: Configure (advanced)
# ? Use a pre-made template? (will replace App.vue and HelloWorld.vue) No
# ? Use custom theme? Yes
# ? Use custom properties (CSS variables)? Yes
# ? Select icon font Font Awesome 5
# ? Use fonts as a dependency (for Electron or offline)? Yes
# ? Use a-la-carte components? Yes
# ? Select locale English
```

## Update view

- `App.vue`

```html
<template>
  <v-app>
    <component :is="layoutName">
      <router-view></router-view>
    </component>
    <loading :active.sync="isLoading" :is-full-page="true" background-color="#495057"/>
  </v-app>
</template>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import config from './config'

export default {
  name: 'app',
  components: {
    Loading
  },
  data() {
    return {
      title: config.appTitle
    }
  },
  computed: {
    layoutName () {
      return this.$store.getters.layoutName
    },
    isLoading () {
      return this.$store.getters.isLoading
    }
  }
}
</script>
```

- `Header.vue`

```html
<template>
  <v-app-bar  color="deep-purple accent-4" dark max-height="64">

    <v-btn icon to="/">
      <v-icon>fa-home</v-icon>
    </v-btn>
    <v-toolbar-title src="/">TP Vuex - Vuetify</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon href="https://github.com/tampm92/tp-awesome/tree/master/vuejs/vue-cli" target="black">
      <v-icon>fab fa-github</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
</style>
```
