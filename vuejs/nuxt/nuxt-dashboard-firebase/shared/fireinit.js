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
