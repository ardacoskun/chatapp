import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA5vUu29Bwbem53KLGqiaHmuh3FberF05U",
  authDomain: "chatapp-react-74b90.firebaseapp.com",
  databaseURL: "https://chatapp-react-74b90.firebaseio.com",
  projectId: "chatapp-react-74b90",
  storageBucket: "chatapp-react-74b90.appspot.com",
  messagingSenderId: "580802423905",
  appId: " 1:580802423905:web:96cbd8cd65821a7f8bce20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
