// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFmjWexr5C7FkXKJ9jMHKn7fgDJmJ2Osw",
  authDomain: "scoresnake-db9c0.firebaseapp.com",
  projectId: "scoresnake-db9c0",
  storageBucket: "scoresnake-db9c0.appspot.com",
  messagingSenderId: "1046963046838",
  appId: "1:1046963046838:web:3b5abe0dc0ba7710dcd917",
  measurementId: "G-MLPTJ81RX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);