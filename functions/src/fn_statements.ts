const { logger } = require("firebase-functions");
import { Timestamp } from "firebase-admin/firestore";
import { db } from "./index";
import admin = require('firebase-admin');

export async function updateSubscribedListnersCB(event: any) {


  //get all subscribers
  const { statementId } = event.params;
  const statement = event.data.after.data();

  //get all subscribers to this statement
  const subscribersRef = db.collection("statementsSubscribe");
  const q = subscribersRef.where("statementId", "==", statementId);
  const subscribersDB = await q.get();

  //update all subscribers
  subscribersDB.docs.forEach((doc: any) => {
    try {
      const subscriberId = doc.data().statementsSubscribeId;
      if (!subscriberId) throw new Error("subscriberId not found");

      db.doc(`statementsSubscribe/${subscriberId}`).set({ statement: statement, lastUpdate: Timestamp.now().toMillis() }, { merge: true });
    } catch (error) {
      logger.log("error updating subscribers", error);
    }

  });
  return
}

export async function updateParentWithNewMessageCB(e: any) {
  try {
   
    //get parentId
    const statement = e.data.data();
    const parentId = statement.parentId;
    logger.log("updateParentWithNewMessageCB", parentId);
    if (!parentId) throw new Error("parentId not found");
    if (parentId !== "top") {
      //get parent
      const parentRef = db.doc(`statements/${parentId}`);
      const parentDB = await parentRef.get();
      const parent = parentDB.data();
      if (!parent) throw new Error("parent not found");
      //update parent
      const lastMessage = statement.statement;
      const lastUpdate = Timestamp.now().toMillis();
      parentRef.update({ lastMessage, lastUpdate });
    }
    return
  } catch (error) {
    logger.log("error updating parent with new message", error);
    console.error(error);
    return
  }
}

export async function sendNotificationsCB(e: any) {
  try {
    const statement = e.data.data();
   
    const parentId = statement.parentId;
   
    if (!parentId) throw new Error("parentId not found");

    //get all subscribers to this statement
    const subscribersRef = db.collection("statementsSubscribe");
    const q = subscribersRef.where("statementId", "==", parentId).where("notification", "==", true);

    const subscribersDB = await q.get();
    logger.log("subscribersDB size", subscribersDB.docs.length);

    //send push notifications to all subscribers
    subscribersDB.docs.forEach((doc: any) => {
      const token = doc.data().token;
      logger.log("token", token);

      if(token){
        const notifications = {
          notification: {
            title: 'הודעה חדשה',
            body: statement.statement
          },
          token: token,
        };
        const webpush = {
          fcm_options: {
            link: "https://dummypage.com"
          }
        }
        const message = {notifications,webpush}
        admin.messaging().send(message)
          .then((response: any) => {
            logger.log("response", response);
            // Response is a message ID string.
            // logger.log('Successfully sent message:', response);
          })
          .catch((error: any) => {
            logger.error('Error sending message:', error);
          });
      }
    });

  } catch (error) {
    logger.error("error sending notifications", error);
  }
}