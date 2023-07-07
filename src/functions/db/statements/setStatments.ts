import { doc, setDoc } from "firebase/firestore";
import { Statement, StatementSchema } from "../../../model/statementModel";
import { DB } from "../config";
import { Collections } from "../collections";

export async function setStatment(statement: Statement) {
    try {
        StatementSchema.parse(statement);
        const statementId = crypto.randomUUID();
        const statementRef = doc(DB, Collections.statements, statementId);
        await setDoc(statementRef, statement);
    } catch (error) {
        console.error(error);
    }
}