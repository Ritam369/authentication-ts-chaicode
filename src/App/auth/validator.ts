import { z } from "zod";

export const signupPayloadValidation = z.object({
    firstName: z.string().min(2).max(40).trim(),
    lastName: z.string().max(40).nullable().optional(),
    email: z.email(),
    password: z.string().min(8).max(66)
})

export const loginPayloadValidation = z.object({
    email: z.email(),
    password: z.string().min(8).max(66)
})