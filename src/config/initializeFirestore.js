import {initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";
// Can't use dotenv for frontend

let app;

(() => {
    //Use import.meta.env.VITE_ to import environment variables for Vite apps
    const firebaseConfig = import.meta.env.VITE_KEY_FOR_FIREBASE_CONFIG;
    const firebaseConfigObj = JSON.parse(firebaseConfig)

    // Initialize Firebase
    app = initializeApp(firebaseConfigObj);

})()

const db = getFirestore();

export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default db;
