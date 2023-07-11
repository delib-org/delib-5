const { logger } = require("firebase-functions");
import { Timestamp } from "firebase-admin/firestore";
import { db } from "./index";

export async function updateSubscribedListnersCB(event: any) {


  //get all subscribers
  const { statementId } = event.params;
  const statement = event.data.after.data();
  logger.log("updating subscribers of statement", statementId);

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

    }

  });
  return
}

export async function updateParentWithNewMessageCB(e: any) {
  try {
    //get parentId
    const statement = e.data.data();
    const parentId = statement.parentId;
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
    return
  }
}