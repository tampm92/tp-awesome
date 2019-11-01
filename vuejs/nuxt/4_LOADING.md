# Loading

## Create container

- Create file `containers/Loading.vue`

```html
<template lang="html">
  <div class="loading-page" v-if="loading">
    <div class="loader">Loading...</div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
  })
}
</script>

<style scoped>
.loading-page {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(197, 197, 197, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}

.loader,
.loader:after {
  border-radius: 50%;
  width: 10em;
  height: 10em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(115,252,214, 0.2);
  border-right: 1.1em solid rgba(115,252,214, 0.2);
  border-bottom: 1.1em solid rgba(115,252,214, 0.2);
  border-left: 1.1em solid #73fcd6;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
```

- Add `Loading container` to `layout/defaultvue`

```html
<template>
  <div class="app">
    <Loading :loading="isLoading"/>
    <nuxt  />
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  import Loading from '../containers/Loading'

  export default {
    name: 'full',
    components: {
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
```

## Update store

- Update file `store/mutation-types.js`

```ts
export const BEGIN_LOADING = 'BEGIN_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
```

- Update file `store/index.js`

```ts
import * as types from './mutation-types'

export const state = () => ({
  isLoading: false
})

export const getters = {
}

export const mutations = {
  [types.BEGIN_LOADING](state, payload) {
    state.isLoading = true;
  },
  [types.STOP_LOADING](state, payload) {
    state.isLoading = false;
  }
}

export const actions = {
  beginLoading(context, actionData) {
    let payload = {
      type: types.BEGIN_LOADING,
      data: actionData
    };
    context.commit(payload)
  },
  stopLoading(context, actionData) {
    let payload = {
      type: types.STOP_LOADING,
      data: actionData
    };
    context.commit(payload)
  }
}
```
