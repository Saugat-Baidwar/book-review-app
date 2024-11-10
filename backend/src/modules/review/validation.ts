import { z } from "zod";

export const AddReviewControllerSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(1),
});
export type TAddReviewControllerInput = z.TypeOf<
  typeof AddReviewControllerSchema
>;

export const UpdateReviewControllerSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewText: z.string().min(1),
});
export type TUpdateReviewControllerInput = z.TypeOf<
  typeof UpdateReviewControllerSchema
>;

export type TReviewCtx = {
  userId: string;
  bookId: string;
};