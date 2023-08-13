import {z} from 'zod';

export const EvaluationSchema = z.object({
    parentStatementId:z.string(),
    evaluationId:z.string(),
    statementId:z.string(),
    evaluatorId:z.string(),
    updatedAt:z.number(),
    value:z.number()
});

export type Evaluation = z.infer<typeof EvaluationSchema>;