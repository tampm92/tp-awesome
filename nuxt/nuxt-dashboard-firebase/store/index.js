import {
  vuexfireMutations,
} from 'vuexfire'

import * as types from './mutation-types'

export const state = () => ({
  isLoading: false,
})

export const mutations = {
  ...vuexfireMutations,
  [types.BEGIN_LOADING](state, payload) {
    state.isLoading = true;
  },
  [types.STOP_LOADING](state, payload) {
    state.isLoading = false;
  },
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
  },
}
