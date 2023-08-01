import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { Statement, StatementSchema, StatementSubscription } from "../../../model/statements/statementModel";
import { DB } from "../config";
import { Collections } from "../collections";
import { Role } from "../../../model/role";
import { getUserFromFirebase } from "../users/usersGeneral";
import { subscribeToNotifications } from "../users/setUsersDB";
import { getUserPermissionToNotifications } from "../../notifications";

export async function setStatmentToDB(statement: Statement) {
    try {
        StatementSchema.parse(statement);

        const statementId = statement.statementId;

        //set statement

        const statementRef = doc(DB, Collections.statements, statementId);
        await setDoc(statementRef, statement);

        //add subscription
        await setStatmentSubscriptionToDB(statement, Role.admin)
        const canGetNotifications = await getUserPermissionToNotifications();
        console.log(canGetNotifications)
        if (canGetNotifications)
            await subscribeToNotifications(statementId, true)

    } catch (error) {
        console.error(error);
    }
}

export async function setStatmentSubscriptionToDB(statement: Statement, role: Role, setNotifications: boolean = false) {
    try {
      
        const user = getUserFromFirebase();
        if (!user) throw new Error("User not logged in");
        if (!user.uid) throw new Error("User not logged in");
        const { statementId } = statement;
        StatementSchema.parse(statement);

        const statementsSubscribeId = `${user.uid}--${statementId}`;

        if(role === Role.admin) setNotifications = true;

        const statementsSubscribeRef = doc(DB, Collections.statementsSubscribe, statementsSubscribeId);
        await setDoc(statementsSubscribeRef, {notification:setNotifications, statement, statementsSubscribeId, role, userId: user.uid, statementId, lastUpdate: Timestamp.now().toMillis(), createdAt: Timestamp.now().toMillis() }, { merge: true });
    } catch (error) {
        console.error(error);
    }
}

export async function setStatmentSubscriptionNotificationToDB(statement: Statement|undefined,  token: string) {
    try {

        if(!statement) throw new Error("Statement is undefined");
        const { statementId } = statement;

        
        const user = getUserFromFirebase();
        if (!user) throw new Error("User not logged in");
        if (!user.uid) throw new Error("User not logged in");
        const statementsSubscribeId = `${user.uid}--${statementId}`;
        const statementsSubscribeRef = doc(DB, Collections.statementsSubscribe, statementsSubscribeId);
        const statementSubscriptionDB = await getDoc(statementsSubscribeRef);
        if (!statementSubscriptionDB.exists()) throw new Error("Statement subscription not found");

        const statementSubscription = statementSubscriptionDB.data() as StatementSubscription;
        let { notification } = statementSubscription;
        notification = !notification || true;
        await setDoc(statementsSubscribeRef, { token,notification }, { merge: true });
    } catch (error) {
        console.error(error);
    }
}
