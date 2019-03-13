export default {
  state: () => ({
    siteInfo: []
  }),
  actions: {
    async nuxtServerInit({ dispatch }) {
      await dispatch('getSiteInfo')
    },

    getSiteInfo({ state, commit }) {
      const info = require('~/content/setup/info.json');

      commit('SET_SITE_INFO', info);
    },
  },
  mutations: {
    SET_SITE_INFO(state, data) {
      state.siteInfo = data
    }
  }
}
