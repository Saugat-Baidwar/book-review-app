import { Request, Response, NextFunction } from "express";
// import { APIError } from "src/utils/error";
import {
  AddReviewControllerSchema,
  UpdateReviewControllerSchema,
} from "./validation";
import {
  createReviewService,
  deleteReviewService,
  getReviewsByBookIdService,
  updateReviewService,
} from "./service";
import { APIError } from "../../utils/error";

export async function addReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;
    const bookId = req.params.bookId;
    const userId = req.user.id;

    const { success, error, data } = AddReviewControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: "Invalid request",
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }

    const review = await createReviewService(
      {
        userId,
        bookId,
      },
      data
    );

    res.status(201).json({
      message: "Review created sucessfully",
      isSuccess: true,
      data: review,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function updateReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    const { success, error, data } =
      UpdateReviewControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: "Invalid request",
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }

    const review = await updateReviewService(
      reviewId,
      {
        userId,
        bookId: "",
      },
      data
    );

    res.status(201).json({
      message: "Review updated sucessfully",
      isSuccess: true,
      data: review,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function deleteReviewController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviewId = req.params.reviewId;

    const userId = req.user.id;

    const review = await deleteReviewService(reviewId, {
      bookId: "",
      userId,
    });

    res.status(201).json({
      message: "Review deleted sucessfully",
      isSuccess: true,
      data: review,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function getReviewsByBookIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookId = req.params.bookId;

    const reviews = await getReviewsByBookIdService(bookId);
    res.status(200).json({
      message: "Reviews retrieved successfully",
      isSuccess: true,
      data: reviews,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}