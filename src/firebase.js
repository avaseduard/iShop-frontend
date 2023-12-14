// // OLD code
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCBAkTNJiC80IgSLgRPwkePfQjSCyGOppI',
//   authDomain: 'ecommerce-app-5fca9.firebaseapp.com',
//   projectId: 'ecommerce-app-5fca9',
//   storageBucket: 'ecommerce-app-5fca9.appspot.com',
//   messagingSenderId: '241277903874',
//   appId: '1:241277903874:web:2696b26efbd40d9701f31b',
// }

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig)

// // export
// export const auth = firebase.auth()
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

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
