import {z} from 'zod';

export const StatementSchema = z.object({
    statement:z.string(),
});

export type Statement = z.infer<typeof StatementSchema>;