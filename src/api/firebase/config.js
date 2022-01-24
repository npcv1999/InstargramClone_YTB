// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat'
require('firebase/auth')
import '@firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLoeYUOxatalUXM_OcXE4eFMTr1mnnfcw",
  authDomain: "instagramcloneytb.firebaseapp.com",
  projectId: "instagramcloneytb",
  storageBucket: "instagramcloneytb.appspot.com",
  messagingSenderId: "349359967863",
  appId: "1:349359967863:web:75e6eb13ca3bf400b68072"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore() 

export  {firebase,db}