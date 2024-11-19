import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: "fusion-system-admin",
    storageBucket: "fusion-system-admin.firebasestorage.app",
    messagingSenderId: "315737830873",
    appId: "1:315737830873:web:060aac2555855892e9d5c8"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);