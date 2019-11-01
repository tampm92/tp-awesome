# TP Awesome Nuxt-AnimeJs

## Documents

- [AnimeJs](https://animejs.com/documentation/)
- [Vue Anime](https://github.com/BenAHammond/vue-anime)

## Starter project

- Create project

```bash
yarn create nuxt-app <project-name>
yarn run dev
```

### Install libs

```bash
yarn add vue-animejs
```

### Create file plugin/anime.js

```ts
import Vue from 'vue';
import VueAnime from 'vue-animejs';

Vue.use(VueAnime)
```

### Update config to file nuxt.config.js

```bash
plugins: [
    '~/plugins/anime.js',
  ],
```

### Using

- Using in element html

```html
<div v-anime="{ rotate: '1turn', backgroundColor: '#FFF', duration: 2000, loop: true }"></div>
```

- Or using in component

```ts
export default {
  name: "my-component",
  data() {
    return {};
  },
  mounted() {
    const targets = this.$el;
    this
      .$anime
      .timeline()
      .add({
        targets,
        translateX: 250,
        easing: 'easeOutExpo',
      })
      .add({
        targets,
        translateX: 250,
        easing: 'easeOutExpo',
      });
      /* ... etc ... */
  },
}
```

## More TIPs

> See other file `*.md`
