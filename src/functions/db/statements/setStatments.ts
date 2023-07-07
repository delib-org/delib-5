import { Timestamp, doc, setDoc } from "firebase/firestore";
import { Statement, StatementSchema } from "../../../model/statementModel";
import { DB } from "../config";
import { Collections } from "../collections";
import { auth } from "../auth";
import { Role } from "../../../model/role";

export async function setStatment(statement: Statement) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");
        if (!user.uid) throw new Error("User not logged in");
        StatementSchema.parse(statement);
        const statementId = crypto.randomUUID();
        const statementRef = doc(DB, Collections.statements, statementId);
        await setDoc(statementRef, statement);

        const statementsSubscribeRef = doc(DB, Collections.statementsSubscribe, `${user.uid}--${statementId}`);
        await setDoc(statementsSubscribeRef, { role:Role.admin, userId: user.uid, statementId, lastUpdate: Timestamp.fromDate(new Date()) }, { merge: true });
    } catch (error) {
        console.error(error);
    }
}