// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";

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

//development
// import { getAuth } from "firebase/auth";
// import { connectFirestoreEmulator  } from "firebase/firestore";

// import { connectAuthEmulator } from "firebase/auth";
// connectFirestoreEmulator(DB, '127.0.0.1', 8080);
// const auth = getAuth();
// connectAuthEmulator(auth, "http://127.0.0.1:9099");
