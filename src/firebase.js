import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBx9F2BE-8i2RfTljSYfyS5r0lqmRTZqs8",
  authDomain: "my-persnal-professnla-porfolio.firebaseapp.com",
  projectId: "my-persnal-professnla-porfolio",
  storageBucket: "my-persnal-professnla-porfolio.firebasestorage.app",
  messagingSenderId: "1041299876889",
  appId: "1:1041299876889:web:a3afc13048c24c3ebd4e88",
  measurementId: "G-LCBF97B3CC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
