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

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
};

// Check if Firebase is configured
const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId
);

let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
}

export { auth };

export const firebaseAuthService = {
  login: async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add your Firebase credentials.");
    }
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  signup: async (email: string, password: string) => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add your Firebase credentials.");
    }
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  logout: async () => {
    if (!auth) {
      return;
    }
    await signOut(auth);
  },

  sendPasswordReset: async (email: string) => {
    if (!auth) {
      throw new Error("Firebase is not configured. Please add your Firebase credentials.");
    }
    await sendPasswordResetEmail(auth, email);
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    if (!auth) {
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, callback);
  },

  getCurrentUser: () => {
    return auth?.currentUser ?? null;
  },

  isConfigured: () => isFirebaseConfigured,
};

export type { User };
