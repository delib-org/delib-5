import {z} from 'zod';

export const StatementSchema = z.object({
    statement:z.string(),
});

export type Statement = z.infer<typeof StatementSchema>;

export const StatementSubscriptionSchema = z.object({
    role:z.string(),
    userId:z.string(),
    statementId:z.string(),
    lastUpdate:z.date(),
    statementsSubscribeId:z.string().optional(),
});

export type StatementSubscription = z.infer<typeof StatementSubscriptionSchema>;