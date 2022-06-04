// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL64BucE5TB2RZSzstQWh28-jHV1oIAA0",
  authDomain: "house-marketplace-app-9b4bb.firebaseapp.com",
  projectId: "house-marketplace-app-9b4bb",
  storageBucket: "house-marketplace-app-9b4bb.appspot.com",
  messagingSenderId: "667635808183",
  appId: "1:667635808183:web:cdd1cd997b17f23344da32"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()