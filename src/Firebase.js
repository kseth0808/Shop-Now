// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import {getStorage} from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-X_j2Fgp6v3PdxCIHfTAEkQgxqrgDg6k",
  authDomain: "shop-now-b70a3.firebaseapp.com",
  projectId: "shop-now-b70a3",
  storageBucket: "shop-now-b70a3.appspot.com",
  messagingSenderId: "42569335710",
  appId: "1:42569335710:web:23a9acc5536d584e314c8f",
  measurementId: "G-MNH34WWMQY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Use getAuth function to get the auth object
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export { auth, provider, storage };