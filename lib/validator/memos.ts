import { z } from 'zod';

export const createMemosSchema = z.object({
    content: z.string().min(1, { message: "Content is required" }),
    tags: z.array(z.string()),
})

export type CreateMemosInput = z.infer<typeof createMemosSchema>;