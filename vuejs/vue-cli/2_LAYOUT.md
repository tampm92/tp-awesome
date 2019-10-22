# Add layout

## Create 3 file layout

- `layouts/layout.js` - auto load layout

```ts
import Vue from 'vue';
import {
    mapActions
} from "vuex";

export default {
    name: `Layout`,
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    created() {
        if (!Vue.options.components[this.name]) {
            Vue.component(
                this.name,
                () => import(`../layouts/${this.name}.vue`),
            );
        }

        this.setLayoutName({ layoutName: this.name });
    },
    render() {
        return this.$slots.default[0];
    },
    methods: {
        ...mapActions({
            setLayoutName: "setLayoutName",
        })
    }
};
```

- `layouts/clean-layout.vue`:

```html
<template>
  <div id="clean-layout">
    <slot />
  </div>
</template>

<script>
export default {};
</script>
```

- `layouts/default-layout.vue`:

```html
<template>
  <div id="default-layout">
    <Header/>
    <slot />
    <Footer/>
  </div>
</template>

<script>
import Header from '../components/partials/Header'
import Footer from '../components/partials/Footer'

export default {
  components: {
    Header,
    Footer
  },
  data: () => ({
  }),
};
</script>
```

## Create file header `src/components/partials/Header.vue`

```html
<template>
  <header>
    <h2>Header</h2>
  </header>
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

## Create file footer `src/components/partials/Footer.vue`

```html
<template>
  <footer>
    <h2>Footer</h2>
  </footer>
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

## Update store `src/store/index.js`

```ts
state: {
    layoutName: 'default-layout'
},
getters: {
    layoutName(state) {
        return state.layoutName
    }
},
mutations: {
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
```

## Update `src/App.vue`

```html
<template>
  <div id="app">
    <component :is="layoutName">
      <h1>{{title}}</h1>
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import config from './config'

export default {
  name: 'app',
  data() {
    return {
      title: config.appTitle
    }
  },
  computed: {
    layoutName () {
      return this.$store.getters.layoutName
    }
  }
}
</script>
```

## Update `src/main.js`

```ts
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Layout from './layouts/layout'
import DefaultLayout from './layouts/default-layout.vue'

Vue.component('layout', Layout)
Vue.component('default-layout', DefaultLayout)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

```

## Change views to test layout

- Update `src/views/Home.vue` with defautl layout

```html
<template>
  <layout name="default-layout">
    <div id="home-page">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>
  </layout>
</template>

<script>
export default {
  name: 'home'
}
</script>
```

- Update `src/views/About.vue` with clean layout

```html
<template>
  <layout name="clean-layout">
    <div id="about-page">
      <h1>This is an about page</h1>
    </div>
  </layout>
</template>
```

- Run app

```bash
yarn serve
```

- Change url `http://localhost:8080/#/` and `http://localhost:8080/#/about` to see changing layout
