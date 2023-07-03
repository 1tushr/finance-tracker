// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR28vBS0cjEVYdVNyBaelcDFVndBrmo8k",
  authDomain: "finance-tracker-10289.firebaseapp.com",
  projectId: "finance-tracker-10289",
  storageBucket: "finance-tracker-10289.appspot.com",
  messagingSenderId: "945214351415",
  appId: "1:945214351415:web:7286c6e079c9b7e7dc37b2",
  measurementId: "G-5P0KFGVNM5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };