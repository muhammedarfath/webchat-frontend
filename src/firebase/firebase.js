// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD248mBb9dkMnv8FKgCmI0sQwHayhC1MX4",
  authDomain: "fybox-9567f.firebaseapp.com",
  projectId: "fybox-9567f",
  storageBucket: "fybox-9567f.appspot.com",
  messagingSenderId: "658991907645",
  appId: "1:658991907645:web:9781c575c5b070ea17fb54",
  measurementId: "G-HE564RV42P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
