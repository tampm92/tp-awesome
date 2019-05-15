import Vue from 'vue'
import {
  firestoreAction
} from 'vuexfire'

import {
  db,
  FieldValue
} from '~/shared/db'
import * as types from './mutation-types'

const usersCollection = db.collection('users');

export const state = () => ({
  list: [],
  detail: {}
})

export const mutations = {
}

export const actions = {
  bindListRef: firestoreAction(async ({
    state,
    commit,
    bindFirestoreRef
  }, actionData) => {
    commit({type: types.BEGIN_LOADING}, {root: true});

    try {
      await bindFirestoreRef('list', usersCollection);
      Vue.toasted.success('Add user success');
    } catch (error) {
      Vue.toasted.error(error.message || error);
    }

    commit({type: types.STOP_LOADING}, {root: true});
  }),

  bindDetailRef: firestoreAction(async ({
    state,
    commit,
    bindFirestoreRef
  }, actionData) => {
    commit({type: types.BEGIN_LOADING}, {root: true});

    try {
      await bindFirestoreRef('detail', usersCollection.doc(actionData.id));
      Vue.toasted.success('Add user success');
    } catch (error) {
      Vue.toasted.error(error.message || error);
    }

    commit({type: types.STOP_LOADING}, {root: true});
  }),

  addRef: firestoreAction(async ({
    state,
    commit,
    bindFirestoreRef
  }, actionData) => {
    commit({type: types.BEGIN_LOADING}, {root: true});

    try {
      actionData.createdAt = FieldValue.serverTimestamp();
      actionData.updatedAt = FieldValue.serverTimestamp();

      await usersCollection.add(actionData);
      Vue.toasted.success('Add user success');
    } catch (error) {
      Vue.toasted.error(error.message || error);
    }

    commit({type: types.STOP_LOADING}, {root: true});
  }),

  updateRef: firestoreAction(async ({
    state,
    commit,
    app,
    bindFirestoreRef
  }, actionData) => {
    commit({type: types.BEGIN_LOADING}, {root: true});

    try {
      const dataUpdate = { ...actionData.data };
      dataUpdate.updatedAt = FieldValue.serverTimestamp();
      await usersCollection.doc(actionData.id).set(dataUpdate);
      Vue.toasted.success('Update user success');
    } catch (error) {
      Vue.toasted.error(error.message || error);
    }

    commit({type: types.STOP_LOADING}, {root: true});
  }),

  deleteRef: firestoreAction(async ({
    state,
    commit,
    bindFirestoreRef
  }, actionData) => {
    commit({type: types.BEGIN_LOADING}, {root: true});

    try {
      await usersCollection.doc(actionData.id).delete();
      Vue.toasted.success('Remove user success');
    } catch (error) {
      Vue.toasted.error(error.message || error);
    }

    commit({type: types.STOP_LOADING}, {root: true});
  })
}
