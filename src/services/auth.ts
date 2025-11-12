import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { auth } from "../firebase";
import { User, UserRole } from "../types";
import { getUser, addUser } from "./firestore";

export const signUp = async (email: string, password: string, role: UserRole, additionalData: Partial<User>): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const firebaseUser = userCredential.user;

  const userData: Omit<User, "id"> = {
    role,
    name: additionalData.name || "",
    email,
    phone: additionalData.phone || "",
    photoUrl: additionalData.photoUrl,
    walletBalance: additionalData.walletBalance || 0,
    loyaltyPoints: additionalData.loyaltyPoints || 0,
  };

  await addUser(userData, firebaseUser.uid);

  return {
    id: firebaseUser.uid,
    ...userData,
  };
};

export const login = async (email: string, password: string): Promise<User | null> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const firebaseUser = userCredential.user;

  const userData = await getUser(firebaseUser.uid);
  return userData;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      const userData = await getUser(firebaseUser.uid);
      callback(userData);
    } else {
      callback(null);
    }
  });
};