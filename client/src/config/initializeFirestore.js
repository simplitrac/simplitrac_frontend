import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

let app;

(() => {
    // Use import.meta.env.VITE_ to import environment variables for Vite apps
    const firebaseConfig = import.meta.env.VITE_KEY_FOR_FIREBASE_CONFIG;
    const firebaseConfigObj = JSON.parse(firebaseConfig);

    // Initialize Firebase
    app = initializeApp(firebaseConfigObj);
})();

const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { onAuthStateChanged, signInWithPopup, signOut, auth, googleProvider};

export default db;
