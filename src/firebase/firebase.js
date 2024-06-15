// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyioKNFRzutcYj67GRXakN5XYu3NdBn7Q",
  authDomain: "onetap-otpverification.firebaseapp.com",
  projectId: "onetap-otpverification",
  storageBucket: "onetap-otpverification.appspot.com",
  messagingSenderId: "978180202483",
  appId: "1:978180202483:web:e8b3f60c478cb7d4cffc86",
  measurementId: "G-SD9ZXVEKH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)

export { auth };
