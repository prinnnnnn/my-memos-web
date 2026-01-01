import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description : z.string().min(1, { message: "Description is required" }),
    due_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    tags: z.array(z.string()),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;