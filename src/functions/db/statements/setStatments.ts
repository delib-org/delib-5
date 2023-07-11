import { Timestamp, doc, setDoc } from "firebase/firestore";
import { Statement, StatementSchema } from "../../../model/statementModel";
import { DB } from "../config";
import { Collections } from "../collections";
import { auth } from "../auth";
import { Role } from "../../../model/role";

export async function setStatmentToDB(statement: Statement) {
    try {
        StatementSchema.parse(statement);

        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        if (!user.uid) throw new Error("User not logged in");

        const statementId = statement.statementId;



        //set statement

        const statementRef = doc(DB, Collections.statements, statementId);
        await setDoc(statementRef, statement);

        //add subscription
        await setStatmentSubscriptionToDB(statement,Role.admin)

    } catch (error) {
        console.error(error);
    }
}

export async function setStatmentSubscriptionToDB(statement: Statement, role: Role) {
    try {
        console.log('subscribe', role)
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        if (!user.uid) throw new Error("User not logged in");
        const { statementId } = statement;
        StatementSchema.parse(statement);
        const statementsSubscribeId = `${user.uid}--${statementId}`;

        const statementsSubscribeRef = doc(DB, Collections.statementsSubscribe, statementsSubscribeId);
        await setDoc(statementsSubscribeRef, { statement, statementsSubscribeId, role, userId: user.uid, statementId, lastUpdate: Timestamp.now().toMillis() }, { merge: true });
    } catch (error) {
        console.error(error);
    }
}