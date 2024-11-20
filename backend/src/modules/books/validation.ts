import { z } from "zod";

export const AddBookControllerSchema = z.object({
  Title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  description: z.string().optional(),
});
export type TAddBookControllerInput = z.TypeOf<typeof AddBookControllerSchema>;

export const UpdateBookControllerSchema = z.object({
  Title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  description: z.string().optional(),
});
export type TUpdateBookControllerInput = z.TypeOf<
  typeof UpdateBookControllerSchema
>;

export const UpdateControllerUserRoleSchema = z.object({
  userId: z.string(),
  role: z.string(),
});

export type TUpadateUserRole = z.TypeOf<
  typeof UpdateControllerUserRoleSchema
>;