import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAit5yUFIDwNEWgyZKAmpaLj1-8iVSFhyY",
  authDomain: "egumeni-eats-e2a32.firebaseapp.com",
  projectId: "egumeni-eats-e2a32",
  storageBucket: "egumeni-eats-e2a32.firebasestorage.app",
  messagingSenderId: "318471281511",
  appId: "1:318471281511:web:6f1039f550a3a7e2746dc2",
  measurementId: "G-G33WN12JFC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export default app;