# Loader

> We will use [vue-loading-overlay](https://github.com/ankurk91/vue-loading-overlay)

1. Install lib

```bash
yarn add vue-loading-overlay
```

2. Update `src/App.vue`

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

export default {
  components: {
    Loading
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

3. Update `src/store/index.js`

```ts
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    layoutName: 'default-layout'
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    },
    isLoading(state) {
      return state.isLoading
    }
  },
  mutations: {
    START_LOADING(state, payload) {
      state.isLoading = true;
    },
    STOP_LOADING(state, payload) {
      state.isLoading = false;
    },
    SET_LAYOUT_NAME(state, payload) {
      state.layoutName = payload.data
    }
  },
  actions: {
    setLayoutName(context, actionData) {
      let payload = {
        type: 'SET_LAYOUT_NAME',
        data: actionData.layoutName
      };
      context.commit(payload)
    }
  }
})
```

4. Use when call http

```bash
# call in action store
async getAllUsers(context, actionData) {
    context.commit({
        type: 'START_LOADING'
    });
    let { data } = await UserService.getAll();
    context.commit({
        type: 'STOP_LOADING'
    });
    return data;
},
```
