import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// !! THIS is SPECIFICALLY for demo purposes! YOU should remove this file, 
// and then rename `firebase.default.js` to `firebase.js` to use in your own project!
firebase.initializeApp({
  apiKey: "AIzaSyCoyXBD6u0Ysru9Op1ZOZffXlPiZps8WK4",
  authDomain: "authdemo-vue.firebaseapp.com",
  databaseURL: "https://authdemo-vue.firebaseio.com",
  projectId: "authdemo-vue",
  storageBucket: "authdemo-vue.appspot.com",
  messagingSenderId: "808683114304"
});

export default firebase
