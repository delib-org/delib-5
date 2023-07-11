/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { Timestamp } from "firebase-admin/firestore";

// import { log } from "firebase-functions/logger";

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
// const { onRequest } = require("firebase-functions/v2/https");
const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

exports.makeuppercase = onDocumentCreated("/statements/{statementId}", (event: any) => {
    // Grab the current value of what was written to Firestore.
    const original = event.data.data().statement;

    // Access the parameter `{statementId}` with `event.params`
    logger.log("Uppercasing", event.params.statementId, original);

    const uppercase = original.toUpperCase();
    logger.log("Uppercasing2", event.params.statementId, uppercase);
    // You must return a Promise when performing
    // asynchronous tasks inside a function
    // such as writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return event.data.ref.set({ statement: uppercase }, { merge: true });
});

exports.updateSubscribedListners = onDocumentUpdated("/statements/{statementId}", async (event: any) => {
    //get all subscribers
    const { statementId } = event.params;
    const  statement  = event.data.after.data();
    logger.log("statement", statement);
    logger.log("statementId", statementId);
    //get all subscribers to this statement
    const subscribersRef = db.collection("statementsSubscribe");
    const q = subscribersRef.where("statementId", "==", statementId);
    const subscribersDB = await q.get();
        //update all subscribers
    subscribersDB.docs.forEach((doc: any) =>{
      try {
        const subscriberId = doc.data().statementsSubscribeId;
        if(!subscriberId) throw new Error("subscriberId not found");
    
        db.doc(`statementsSubscribe/${subscriberId}`).set({statement: statement,lastUpdate:Timestamp.now().toMillis()}, {merge: true});
      } catch (error) {
        
      }
        //lastUpdated:Timestamp.now()
      
    });





    return
});