import { Timestamp, doc, setDoc } from "@firebase/firestore";
import { Statement } from "../../../model/statements/statementModel";
import { DB } from "../config";
import { getUserFromFirebase } from "../users/usersGeneral";
import { Collections } from "../collections";

export async function setEvaluation(statement:Statement, evaluation:number):Promise<void> {
    try {
        if(evaluation<-1 || evaluation>1) throw new Error("Evaluation is not in range");

        const parentId = statement.parentId;
        if(!parentId) throw new Error("ParentId is undefined");
        const statementId = statement.statementId;
        const user = getUserFromFirebase();
        const userId = user?.uid;
        if(!userId) throw new Error("User is undefined");
        const evaluationId = `${userId}--${statementId}`;

        const evaluationRef = doc(DB, Collections.evaluations, evaluationId);
        await setDoc(evaluationRef,{parentId, evaluationId, statementId, evaluatorId:userId, updatedAt:Timestamp.now().toMillis(), value:evaluation});
    } catch (error) {
        console.error(error);
    }
}