// import { APIError } from "src/utils/error";
import {
  TAddReviewControllerInput,
  TReviewCtx,
  TUpdateReviewControllerInput,
} from "./validation";
import { ReviewModel } from "./model";
import mongoose from "mongoose";
import { APIError } from "../../utils/error";

export async function createReviewService(
  ctx: TReviewCtx,
  input: TAddReviewControllerInput
) {
  const { rating, reviewText } = input;

  const newReview = new ReviewModel({
    bookId: ctx.bookId,
    userId: ctx.userId,
    rating,
    reviewText,
  });

  await newReview.save();

  return newReview;
}

export async function updateReviewService(
  reviewId: string,
  ctx: TReviewCtx,
  input: TUpdateReviewControllerInput
) {
  const review = await ReviewModel.findById(reviewId);
  if (!review) {
    throw APIError.notFound("Review not found");
  }

  /**
   * Check if the review belongs to the user
   */
  if (review.userId?.toString() !== ctx.userId) {
    throw APIError.forbidden("You are not authorized to update this review");
  }

  const { reviewText, rating } = input;

  review.reviewText = reviewText;
  review.rating = rating;

  await review.save();

  return review;
}

export async function deleteReviewService(id: string, ctx: TReviewCtx) {
  const review = await ReviewModel.findById(id);
  if (!review) {
    throw APIError.notFound("Review not found");
  }

  /**
   * Check if the review belongs to the user
   */
  if (review.userId?.toString() !== ctx.userId) {
    throw APIError.forbidden("You are not authorized to delete this review");
  }

  await ReviewModel.deleteOne({ _id: id });

  return review;
}

export async function getReviewsByBookIdService(bookId: string) {
  const reviews = await ReviewModel.find({
    bookId,
  });
  return reviews;
}