import {
  vuexfireMutations,
} from 'vuexfire'

import * as types from './mutation-types'
import {auth, GoogleProvider} from '~/shared/fireinit'

export const state = () => ({
  isLoading: false,
  authUser: null
})

export const getters = {
  activeAuthUser: (state, getters) => {
    return state.authUser
  }
}

export const mutations = {
  [types.BEGIN_LOADING](state, payload) {
    state.isLoading = true;
  },
  [types.STOP_LOADING](state, payload) {
    state.isLoading = false;
  },
  /**
   * Auth
   */
  [types.SET_AUTH_USER] (state, payload) {
    state.authUser = payload
  },

  // vuexfire
  ...vuexfireMutations
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
  /**
   * Auth
   */
  setGoogleAuthUser ({commit}, payload) {
    commit(types.SET_AUTH_USER, {
      uid: payload.uid,
      email: payload.uid,
      photoURL: payload.uid,
      displayName: payload.uid,
    })
  },
  signInWithGoogle ({commit}) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider)
      resolve()
    })
  },
  signOut ({commit}) {
    auth.signOut().then(() => {
      commit(types.BEGIN_LOADING, null)
    }).catch(err => console.log(error))
  }
}
