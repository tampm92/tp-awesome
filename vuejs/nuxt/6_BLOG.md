# Blog with Markdown

- Install lib:

```bash
yarn add @nuxtjs/markdownit
```

- add config to file nuxt.config.js

```bash
modules: [
    '@nuxtjs/markdownit',
],
markdownit: {
    injected: true,
    preset: 'default',
    breaks: true,
    html: true
},
```

- Content Markdown

> Please see all files in folder `content`

- Create file `index.js` folder `store`

```bash
export default {
  state: () => ({
    siteInfo: [],
    allBlogs: [],
    allCategories: []
  }),
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('getSiteInfo')
      await dispatch('getAllBlogs')
      await dispatch('getAllCategories')
    },

    getSiteInfo({ state, commit }) {
      const info = require('~/content/setup/info.json');
      const context = require.context('~/content/blog/posts/', false, /\.json$/);

      const searchPosts = context.keys().map(key => ({
        ...context(key),
        _path: `/blog/${key.replace('.json', '').replace('./', '')}`
      }));

      commit('SET_SITE_INFO', info)
      commit('SET_POSTS', searchPosts)
    },
    async getAllBlogs({ state, commit }) {
      const context = await require.context('~/content/blog/posts/', false, /\.json$/);

      const searchPosts = await context.keys().map(key => ({
        ...context(key),
        _path: `/blogs/${key.replace('.json', '').replace('./', '')}`
      }));

      commit('SET_POSTS', searchPosts.reverse())
    },
    async getAllCategories({ state, commit }) {
      const context = await require.context('~/content/categories/posts/', false, /\.json$/);

      const pages = await context.keys().map(key => ({
        ...context(key),
        _path: `/category/${key.replace('.json', '').replace('./', '')}`
      }));

      commit('SET_CATS', pages)

    },
  },
  mutations: {
    SET_SITE_INFO(state, data) {
      state.siteInfo = data
    },
    SET_POSTS(state, data) {
      state.allBlogs = data
    },
    SET_CATS(state, data) {
      state.allCategories = data
    }
  }
}
```

- Use in component in folder

> Please see all files `nuxt-blog-example\pages\blogs`