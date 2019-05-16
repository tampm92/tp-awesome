import { auth } from '@/shared/fireinit.js'

export default context => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return resolve(store.dispatch('setGoogleAuthUser', user));
      }
      return resolve();
    })
  })
}
