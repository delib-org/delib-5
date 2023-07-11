// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,connectFirestoreEmulator  } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { keys } from "./configKey";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = keys;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const analytics = getAnalytics(app);
connectFirestoreEmulator(DB, '127.0.0.1', 8080);
const auth = getAuth();
connectAuthEmulator(auth, "http://127.0.0.1:9099");
