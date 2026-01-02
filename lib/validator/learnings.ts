import { z } from 'zod';

export const CreateLearningAreaSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    color_hex: z.string().length(7, { message: "Color hex must be 7 characters long" }),
    icon_emoji: z.string().min(1, { message: "Icon emoji is required" }),
})

export type CreateLearningAreaInput = z.infer<typeof CreateLearningAreaSchema>;