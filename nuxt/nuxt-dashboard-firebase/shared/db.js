import Firebase from 'firebase'

import config from './env'

var firebase = !Firebase.apps.length ? Firebase.initializeApp(config.firebase) : Firebase.app();

export const db = firebase.firestore();

// Export types that exists in Firestore
export const {
  Timestamp,
  GeoPoint,
  FieldValue
} = Firebase.firestore;
