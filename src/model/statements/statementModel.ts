import {z} from 'zod';
import { UserSchema } from '../users/userModel';

export enum StatementType {
    STATEMENT = 'statement',
    GROUP = 'GROUP'
};

const statementType = z.enum([StatementType.STATEMENT, StatementType.GROUP]);



export const StatementSchema = z.object({
    statement:z.string(),
    statementId:z.string(),
    creatorId:z.string(),
    creator:UserSchema,
    parentId:z.string(),
    hasChildren:z.boolean().optional(),
    lastMessage:z.string().optional(),
    lsetUpdate:z.number().optional(),
    createdAt:z.number(),
    type:statementType,
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