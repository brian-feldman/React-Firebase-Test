import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  });
}

const firebaseAuth = firebase.auth();
const firebaseStorage = firebase.storage();
const firebaseDB = firebase.firestore();
const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export default firebase;

export { firebaseAuth, firebaseDB, firebaseStorage, firebaseTimestamp };
