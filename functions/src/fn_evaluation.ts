import { logger } from "firebase-functions/v1";
import { db } from "./index";
import { runTransaction } from "firebase/firestore";
import { DocumentSnapshot } from "firebase-admin/firestore";

export async function updateEvaluation(event: any) {
    try {
        logger.info("updateEvaluation");
        const evaluationId = event.params.evaluationId;
        logger.info("evaluationId", evaluationId);
        const evaluation = event.data.after.data();

        const userEvaluation = evaluation.evaluation;
        const parentId = evaluation.parentId;
        
        if (!userEvaluation)
            throw new Error("userEvaluation is not defined");

        if (!parentId)
            throw new Error("parentId is not defined");


        //get parent statement
        const parentRef = db.collection("statements").doc(parentId);
        const parentStatementDB = await parentRef.get();
        logger.info("parentStatementDB", parentStatementDB.data());
        let totalEvaluators = parentStatementDB.data().totalEvaluators || 0;
        logger.info("totalEvaluators 1:", totalEvaluators);

        //get the evluation this user evaluated inside the parent statement
        const parentEvaluationsRef = db.collection("evaluations");
        //look for an evaluation by the user in the parent statement
        const q = parentEvaluationsRef.where("parentId", "==", parentId).where("evaluatorId", "==", evaluation.evaluatorId);
        const parentEvaluationsDB = await q.get();


        let totalEvaluatorEvaluations = parentEvaluationsDB.size || 1;
        logger.info("totalEvaluatorEvaluations", totalEvaluatorEvaluations);

        if (totalEvaluatorEvaluations <= 1) {
            logger.info("first time evaluating in this parent statment");
            //if size of parentEvaluationsDB by evaluator is 0 then this is the first evaluation by this user on this statement.add it to the parent statement
            await db.runTransaction(async (t: any) => {
                try {

                    const parentStatementDB = await t.get(parentRef);

                    

                    if (!parentStatementDB.exists) {
                        throw new Error("parentStatementRef does not exist");
                    }

                    const newTotalEvaluators = parentStatementDB.data().totalEvaluators + 1 || 1;
                    t.update(parentRef, { totalEvaluators: newTotalEvaluators });

                    totalEvaluators = newTotalEvaluators;

                } catch (error) {
                    logger.error(error);
                }
            });
        }

        logger.info("totalEvaluators", totalEvaluators);


        //calculate over all evaluation
        //how do we evluate consensus?
        // total particpents in a statement
        // number of evaluators on a sub statement
        //log2 abs((positive_evaluations - negative_evaluations)) / total_evaluators_in_parent_statement

        //(pst-neg, 1, -1)(log1.3(abs(atLeast 1(positive_evaluators_evaluation - negative_evaluators_evaluation)))) / total_evaluators


    } catch (error) {
        logger.error(error);
        return;
    }
}
