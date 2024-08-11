// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1CzRxk_laCr0lsuY9P1rMWTi467PSu1E",
  authDomain: "appnotes2-92999.firebaseapp.com",
  projectId: "appnotes2-92999",
  storageBucket: "appnotes2-92999.appspot.com",
  messagingSenderId: "1037072431239",
  appId: "1:1037072431239:web:86f21b727803c020cb2022"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;