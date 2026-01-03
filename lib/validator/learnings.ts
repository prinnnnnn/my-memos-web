import { z } from 'zod';

export const CreateLearningAreaSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    color_hex: z.string().length(7, { message: "Color hex must be 7 characters long" }),
    icon_emoji: z.string().min(1, { message: "Icon emoji is required" }),
})

export type CreateLearningAreaInput = z.infer<typeof CreateLearningAreaSchema>;

export const CreateLearningItemSchema = z.object({
    area_id: z.number(),
    title: z.string().min(1, { message: "Title is required" }),
    notes: z.string().min(1, { message: "Notes are required" }),
    subtitle: z.string().min(1, { message: "Subtitle is required" }),
    started_date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
    expected_completion: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
})

export type CreateLearningItemInput = z.infer<typeof CreateLearningItemSchema>;