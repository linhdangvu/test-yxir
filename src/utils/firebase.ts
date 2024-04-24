import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpU1rQ6UHp5EWs4_Z_vpkjvbOWBrB7k3s",
  authDomain: "test-yxir.firebaseapp.com",
  projectId: "test-yxir",
  storageBucket: "test-yxir.appspot.com",
  messagingSenderId: "631983894961",
  appId: "1:631983894961:web:d6c14e2ed90a137fa74d90",
  measurementId: "G-T429S6ENVT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
