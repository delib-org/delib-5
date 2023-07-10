import {z} from 'zod';

export const StatementSchema = z.object({
    statement:z.string(),
    statementId:z.string(),
    creatorId:z.string(),
    parentId:z.string(),
});

export type Statement = z.infer<typeof StatementSchema>;

export const StatementSubscriptionSchema = z.object({
    role:z.string(),
    userId:z.string(),
    statementId:z.string(),
    lastUpdate:z.number(),
    statementsSubscribeId:z.string(),
    statement:StatementSchema
});

export type StatementSubscription = z.infer<typeof StatementSubscriptionSchema>;