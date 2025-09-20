
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "studio-8209484962-4333c",
  appId: "1:320793560566:web:f87b70324022cc3d6933d7",
  storageBucket: "studio-8209484962-4333c.appspot.com",
  apiKey: "AIzaSyAFwfyEZ2klRerQn711MGSgWyALe7PbFC8",
  authDomain: "studio-8209484962-4333c.firebaseapp.com",
  messagingSenderId: "320793560566",
  measurementId: "",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
