import { z } from "zod";

export const AddBookControllerSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  description: z.string().optional(),
});
export type TAddBookControllerInput = z.TypeOf<typeof AddBookControllerSchema>;

export const UpdateBookControllerSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  genre: z.string().min(1),
  description: z.string().optional(),
});
export type TUpdateBookControllerInput = z.TypeOf<
  typeof UpdateBookControllerSchema
>;