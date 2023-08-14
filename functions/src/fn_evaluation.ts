import { logger } from "firebase-functions/v1";
import { db } from "./index";


export async function updateEvaluation(event: any) {
    try {

        // const evaluationId = event.params.evaluationId;

        const dataAfter = event.data.after.data();
        const evaluation = dataAfter.evaluation;
        if (evaluation === undefined) throw new Error("evaluation is not defined");

        const dataBefore = event.data.before.data();
        let previousEvaluation = 0;
        if (dataBefore) previousEvaluation = dataBefore.evaluation || 0;

        const evaluationDeferneces = evaluation - previousEvaluation;

        const statementId = dataAfter.statementId;
        if (!statementId) throw new Error("statementId is not defined");
        const statementRef = db.collection("statements").doc(statementId);

        const parentId = dataAfter.parentId;
        if (!parentId)
            throw new Error("parentId is not defined");


        //get parent statement
        const parentRef = db.collection("statements").doc(parentId);

        const statementEvaluatorsRef = db.collection("statementEvaluators");
        const statementEvaluatorDB = await statementEvaluatorsRef.doc(`${dataAfter.evaluatorId}--${parentId}`).get();

        const totalEvaluators = await updateNumberOfEvaluators(statementEvaluatorDB, statementEvaluatorsRef, dataAfter, parentId, parentRef);
        const _totalEvaluations = await setNewEvaluation(statementRef, evaluationDeferneces, evaluation, previousEvaluation);

        const consensus = await calculateConsensus(_totalEvaluations, totalEvaluators);

        //set consensus to statement in DB
        await statementRef.update({ consensus });







    } catch (error) {
        logger.error(error);
        return;
    }

    async function calculateConsensus(_totalEvaluations: number, totalEvaluatorEvaluations: any) {
        //(pst-neg, 1, -1)(log1.3(abs(atLeast 1(positive_evaluators_evaluation - negative_evaluators_evaluation)))) / total_evaluators
        try {


            const proevaluation = (() => {
                if (_totalEvaluations < 0) {
                    return -1;
                }
                return 1;
            })();

            const totalEvaluations = beforeLogCalculation(Math.abs(_totalEvaluations));
            const totalLogEvaluations = getBaseLog(totalEvaluations, 1.3);
            const consensus = proevaluation * (totalLogEvaluations / totalEvaluatorEvaluations);

            return consensus;
        } catch (error) {
            logger.error(error);
            return { consensus: 0, _totalEvaluations: 0 };
        }
    }

    async function setNewEvaluation(statementRef: any, evaluationDeferneces: number, evaluation: number, previousEvaluation: number): Promise<number> {
        let newTotalEvaluations: number = 0;
        await db.runTransaction(async (t: any) => {
            try {
                const statementDB = await t.get(statementRef);

                if (!statementDB.exists) {
                    throw new Error("statement does not exist");
                }

                newTotalEvaluations = statementDB.data().totalEvaluations;
                const oldPro = statementDB.data().pro || 0;
                const oldCon = statementDB.data().con || 0;
                logger.info('statementDB.data()', statementDB.data());
                logger.info(`oldPro: ${oldPro}, oldCon: ${oldCon}`);

                const { newCon, newPro } = updateProCon(oldPro, oldCon, evaluation, previousEvaluation);
                logger.info(`newPro: ${newPro}, newCon: ${newCon}`);

                if (newTotalEvaluations === undefined)
                    newTotalEvaluations = 0;


                newTotalEvaluations += evaluationDeferneces;

                t.update(statementRef, { totalEvaluations: newTotalEvaluations, con: newCon, pro: newPro });

                // return newTotalEvaluations
            } catch (error) {
                logger.error(error);
                // return 0;
            }
        });
        return newTotalEvaluations;

        function updateProCon(oldPro: number, oldCon: number, evaluation: number, previousEvaluation: number): { newPro: number, newCon: number } {
            try {
                let newPro = oldPro, newCon = oldCon;

                if (previousEvaluation > 0) {
                    newPro = oldPro - Math.abs(previousEvaluation);
                } else if (previousEvaluation < 0) {
                    newCon = oldCon - Math.abs(previousEvaluation);
                }

                if (evaluation > 0) {
                    newPro += evaluation;
                } else if (evaluation < 0) {
                    newCon += Math.abs(evaluation);
                }


                return { newPro, newCon };
            } catch (error) {
                logger.error(error);
                return { newPro: oldPro, newCon: oldCon };
            }
        }
    }

    async function updateNumberOfEvaluators(statementEvaluatorDB: any, statementEvaluatorsRef: any, dataAfter: any, parentId: any, parentRef: any) {
        try {
            let totalEvaluators = 0;
            if (!statementEvaluatorDB.exists) {
                //add to statementEvaluators
                await statementEvaluatorsRef.doc(`${dataAfter.evaluatorId}--${parentId}`).set({ evaluatorId: dataAfter.evaluatorId, parentId: parentId });

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
            } else {
                const parentStatementDB = await parentRef.get();
                if (!parentStatementDB.exists) {
                    throw new Error("parentStatementRef does not exist");
                }
                totalEvaluators = parentStatementDB.data().totalEvaluators || 0;
            }
            return totalEvaluators;
        } catch (error) {
            logger.error(error);
            return 0;
        }
    }
    function getBaseLog(x: number, baseLog: number): number {
        return Math.log(baseLog) / Math.log(x);
    }
}

function beforeLogCalculation(totalEvaluations: number) {
    if (totalEvaluations < 1) {
        return 1
    }
    return totalEvaluations
}
