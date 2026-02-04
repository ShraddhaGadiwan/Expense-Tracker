import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  enableIndexedDbPersistence
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDDOZK6Xfe8GsuQzUDqGYqCIkHWcBfCRIk",
  authDomain: "expense-tracker-ddcf6.firebaseapp.com",
  projectId: "expense-tracker-ddcf6",
  storageBucket: "expense-tracker-ddcf6.firebasestorage.app",
  messagingSenderId: "478976059750",
  appId: "1:478976059750:web:71ce330f1ace781924c0a7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

enableIndexedDbPersistence(db)
  .catch((err) => {
    console.log("Offline persistence error:", err.code);
  });
