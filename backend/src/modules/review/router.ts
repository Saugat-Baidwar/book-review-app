import { Router } from "express";
import {
  addReviewController,
  deleteReviewController,
  getReviewsByBookIdController,
  updateReviewController,
} from "./controller";
import { checkAuth } from "../auth/middleware";

function createReviewRouter() {
  const router = Router();
  router.post("/:bookId", checkAuth, addReviewController);
  router.post("/update/:reviewId", checkAuth, updateReviewController);
  router.delete("/:reviewId", checkAuth, deleteReviewController);

  router.get("/:bookId", getReviewsByBookIdController);

  return router;
}

export const reviewRouter = createReviewRouter();