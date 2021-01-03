import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyBm96Ym-YVtFp6WvcB9OV_6n4NomXs0RSo",
  authDomain: "mecha1sample-lpb.firebaseapp.com",
  projectId: "mecha1sample-lpb",
  storageBucket: "mecha1sample-lpb.appspot.com",
  messagingSenderId: "830388863418",
  appId: "1:830388863418:web:186211889977cec5015d83",
  measurementId: "G-E9NJS9MFKZ"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// export const firebaseAnalyst = firebase.analytics();

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebaseApp;