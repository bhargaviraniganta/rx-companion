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

// Debug: Log config status at startup
console.log("Firebase config check:", { 
  isConfigured: isFirebaseConfigured,
  hasApiKey: !!firebaseConfig.apiKey,
  hasAuthDomain: !!firebaseConfig.authDomain,
  hasProjectId: !!firebaseConfig.projectId
});

let app: ReturnType<typeof initializeApp> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
}

export { auth };

export const firebaseAuthService = {
  login: async (email: string, password: string) => {
    if (!auth) {
      console.error("Firebase not configured. Config:", { 
        hasApiKey: !!firebaseConfig.apiKey, 
        hasAuthDomain: !!firebaseConfig.authDomain, 
        hasProjectId: !!firebaseConfig.projectId 
      });
      throw new Error("Firebase is not configured. Please add your Firebase credentials.");
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Firebase login error:", error);
      throw error;
    }
  },

  signup: async (email: string, password: string) => {
    if (!auth) {
      console.error("Firebase not configured. Config:", { 
        hasApiKey: !!firebaseConfig.apiKey, 
        hasAuthDomain: !!firebaseConfig.authDomain, 
        hasProjectId: !!firebaseConfig.projectId 
      });
      throw new Error("Firebase is not configured. Please add your Firebase credentials.");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Firebase signup error:", error);
      throw error;
    }
  },

  logout: async () => {
    if (!auth) {
      return;
    }
    await signOut(auth);
  },

  sendPasswordReset: async (email: string) => {
    if (!auth) {
      console.error("Firebase not configured. Config:", { 
        hasApiKey: !!firebaseConfig.apiKey, 
        hasAuthDomain: !!firebaseConfig.authDomain, 
        hasProjectId: !!firebaseConfig.projectId 
      });
      throw new Error("Firebase is not configured. Please add your Firebase credentials.");
    }
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Firebase password reset error:", error);
      throw error;
    }
  },

  onAuthStateChanged: (callback: (user: User | null) => void) => {
    if (!auth) {
      // If Firebase not configured, just call with null and return empty unsubscribe
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
