// src/firebase/config.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyCrgoNm1mXvfaWIJ7loAohha35Eylewoz4",
  authDomain: "india-bazzar-cdc49.firebaseapp.com",
  projectId: "india-bazzar-cdc49",
  storageBucket: "india-bazzar-cdc49.appspot.com", // ✅ Correct
  messagingSenderId: "284925153796",
  appId: "1:284925153796:web:dd5b2aab38f96c4dde1b51",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);         
const db = getFirestore(app);      
const storage = getStorage(app);   // ✅ Initialize storage

// ✅ Export all
export { app, auth, db, storage };
