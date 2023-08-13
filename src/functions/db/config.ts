// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
import { keys, vapidKey } from "./configKey";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = keys;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const DB = getFirestore(app);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);

export let deviceToken: string | undefined = undefined;

getToken(messaging, { vapidKey }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log('currentToken',currentToken)
    deviceToken = currentToken;

    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});

//development
import { getAuth } from "firebase/auth";
import { connectFirestoreEmulator  } from "firebase/firestore";
console.info("Running on development mode")

import { connectAuthEmulator } from "firebase/auth";
connectFirestoreEmulator(DB, '127.0.0.1', 8080);
const auth = getAuth();
connectAuthEmulator(auth, "http://127.0.0.1:9099");
