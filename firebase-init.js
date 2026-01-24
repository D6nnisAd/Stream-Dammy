// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// TODO: Replace the following with your app's Firebase project configuration
// You can find this in Firebase Console -> Project Settings -> General
const firebaseConfig = {
  apiKey: "AIzaSyAPBFVdjl_xXwypJeTW6T1jCbl_chAD6f4",
  authDomain: "stream-dammy.firebaseapp.com",
  projectId: "stream-dammy",
  storageBucket: "stream-dammy.firebasestorage.app",
  messagingSenderId: "234231180354",
  appId: "1:234231180354:web:ea496db99758c72f6b11db"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Export instances for use in other files
export { app, db, auth, doc, getDoc, setDoc, signInWithEmailAndPassword, onAuthStateChanged, signOut };
