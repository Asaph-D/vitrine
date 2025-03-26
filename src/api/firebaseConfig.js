import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0KyTNU5IHhdC_CcKODc4z66DL6JBb0Gc",
  authDomain: "prodancakes.firebaseapp.com",
  projectId: "prodancakes",
  storageBucket: "prodancakes.firebasestorage.app",
  messagingSenderId: "4161411547",
  appId: "1:4161411547:web:1f1daf41fd2623fa45effe",
  measurementId: "G-ENEJC2BHCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
