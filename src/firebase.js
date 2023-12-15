// NEW CODE
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

// Parse the JSON string into a JavaScript object
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG || '{}')

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// export
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
