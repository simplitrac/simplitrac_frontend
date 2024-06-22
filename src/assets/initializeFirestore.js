import {initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'dotenv/config'


(() => {
    // eslint-disable-next-line no-undef
    const firebaseConfig = process.env.KEY_FOR_FIREBASE_CONFIG;

    // Initialize Firebase
    initializeApp(firebaseConfig);

})()

const db = getFirestore();

export default db;
