import Firebase from 'firebase'
let config = {
  apiKey: "AIzaSyARmLbmjkKoQrN2saQDKUiQ6TxdrcfXCfk",
  authDomain: "tamy-wedding.firebaseapp.com",
  databaseURL: "https://tamy-wedding.firebaseio.com",
  projectId: "tamy-wedding",
  storageBucket: "tamy-wedding.appspot.com",
  messagingSenderId: "924438747574",
  appId: "1:924438747574:web:45f656c0a06f393f"
};

var firebase  = !Firebase.apps.length ? Firebase.initializeApp(config) : Firebase.app();

export const db = firebase
  .firestore();

// Export types that exists in Firestore
let { TimeStamp, GeoPoint } = Firebase.firestore;
export { TimeStamp, GeoPoint };
