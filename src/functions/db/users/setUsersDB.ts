import { doc, setDoc } from "firebase/firestore";
import { StatementSubscriptionNotification } from "../../../model/statements/statementModel";
import { Collections } from "../collections";
import { getUserFromFirebase } from "./usersGeneral";
import { DB, deviceToken } from "../config";

export async function subscribeToNotifications(statementId: string, subscribed: boolean) {
    try {
        if (!statementId) throw new Error("statementId not found")
        const user = getUserFromFirebase();
        if (!user) throw new Error("user not found")
        const userId = user.uid;
        const subscriptionId = `${userId}--${statementId}`;
        if (!deviceToken) throw new Error("deviceToken not found");

        const subscribtionToNotificationsRef = doc(DB, Collections.statementsNotifications, subscriptionId);
        const newSubscription: StatementSubscriptionNotification = { userId, statementId, subscribed, token: deviceToken };
        await setDoc(subscribtionToNotificationsRef, newSubscription, { merge: true });

    } catch (error) {
        console.error(error)
    }
}