// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
/* import { getAnalytics } from "firebase/analytics"; */
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPc-ca6OuuDAxtR0tMS8RxoOaP37qW3dU",
  authDomain: "files-storaged.firebaseapp.com",
  projectId: "files-storaged",
  storageBucket: "files-storaged.appspot.com",
  messagingSenderId: "804545655943",
  appId: "1:804545655943:web:4a14cccf1d8ea3f66fb422",
  measurementId: "G-59PG1EKBCF"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */
export const storage = getStorage(app)
export const database = getFirestore(app)
export const auth = getAuth(app)