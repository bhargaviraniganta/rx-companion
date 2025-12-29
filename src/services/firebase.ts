import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import { auth } from "@/firebase";

// Firebase configuration using Vite env variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};
// Firebase configuration - using direct values since VITE_ env vars are build-time only
/*
const firebaseConfig = {
  apiKey: "AIzaSyAW14pyx-GT0RU1Zd1cf2MtIUAOpmiZ1lk",
  authDomain: "drug-excipient-analyser.firebaseapp.com",
  projectId: "drug-excipient-analyser",
};

*/
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

export const firebaseAuthService = {
  login: async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  signup: async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  logout: async () => {
    await signOut(auth);
  },

  /*
  sendPasswordReset: async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  },
  */
 
  sendPasswordReset: async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim(),{
      url: "https://drug-excipient-compat.netlify.app/login",
      handleCodeInApp: false,
    });
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser: () => {
    return auth.currentUser;
  },
};

export type { User };
