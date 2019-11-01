# Firebase with Auth and Storge

> Document [here](https://vuefire.vuejs.org/vuexfire/)

## Setup firebase project

> Document [here](https://firebase.google.com/docs/auth/web/google-signin)

## Installation

```bash
yarn add vuexfire firebase
yarn add vue-toasted
```

## Add config

- Update `.env`

```bash
FIREBASE_API_KEY=apiKey
FIREBASE_AUTH_DOMAIN=authDomain
FIREBASE_DATEBASE_URL=databaseURL
FIREBASE_PROJECT_ID=projectId
FIREBASE_STORAGE_BUCKET=storageBucket
FIREBASE_MESSAGING_SENDER_ID=messagingSenderId
FIREBASE_APP_ID=appId
```

- Update `shared/config.js`

```ts
firebase: {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}
```

- Create file `shared/fireinit.js`

```ts
import Firebase from 'firebase'

import config from './env'

var firebase = !Firebase.apps.length ? Firebase.initializeApp(config.firebase) : Firebase.app();

export const GoogleProvider = new Firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();

// Export types that exists in Firestore
export const {
  Timestamp,
  GeoPoint,
  FieldValue
} = Firebase.firestore;
```

## Add plugin

- Create file `plugins/fireauth.js`

```ts
import { auth } from '../shared/fireinit.js'

export default context => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return resolve(store.dispatch('auth/setGoogleAuthUser', user));
      }
      return resolve();
    })
  })
}
```

- Create file `plugins/vue-toasted.js`

```ts
import Vue from 'vue';
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  duration: 3000
});
```

- update `nuxt.config.js`

```bash
plugins: [
  '~/plugins/vue-toasted',
  '~/plugins/fireauth'
],
```

## Add middleware

- Create file `middleware/router-auth.js`

```ts
export default function({ store, redirect, route }) {
  store.state.auth.authUser != null && route.name == 'login' ? redirect('/admin') : ''
  store.state.auth.authUser == null && isAdminRoute(route) ? redirect('/login') : ''
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path == '/admin')) {
    return true
  }
}
```

- update `nuxt.config.js`

```bash
router: {
  middleware: 'router-auth'
},
```

## Store

- Update file `store/mutation-types.js`

```ts
export const BEGIN_LOADING = 'BEGIN_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const SET_AUTH_USER = 'SET_AUTH_USER';
```

- Update file `store/index.js`

```ts
import {
  vuexfireMutations,
} from 'vuexfire'

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
  }
}
```

- Create file `store/auth.js`

```ts
import * as types from './mutation-types'
import {auth, GoogleProvider} from '../shared/fireinit'

export const state = () => ({
  authUser: null
})

export const getters = {
  activeAuthUser: (state, getters) => {
    return state.authUser
  }
}

export const mutations = {
  [types.SET_AUTH_USER] (state, payload) {
    state.authUser = payload
  }
}

export const actions = {
  setGoogleAuthUser ({commit}, payload) {
    commit(types.SET_AUTH_USER, {
      uid: payload.uid,
      email: payload.uid,
      photoURL: payload.uid,
      displayName: payload.uid,
    })
  },
  signInWithGoogle ({commit}) {
    commit({type: types.BEGIN_LOADING}, {root: true});
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider)
      resolve()
    })
  },
  signOut ({commit}) {
    auth.signOut().then(() => {
      commit({type: types.BEGIN_LOADING}, {root: true});
    }).catch(err => console.log(error))
  }
}
```

- Create file `store/user.js`

```ts
import Vue from 'vue'
import {
  firestoreAction
} from 'vuexfire'

import {
  db,
  FieldValue
} from '../shared/fireinit'
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
```
