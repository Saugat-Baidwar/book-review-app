import { Request, Response, NextFunction } from "express";

import {
  AddBookControllerSchema,
  UpdateBookControllerSchema,
} from "./validation";
import {
  createBookService,
  deleteBookService,
  getBookByIdService,
  getBooksService,
  updateBookService,
} from "./service";
import { APIError } from "../../utils/error";

export async function addBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const { success, error, data } = AddBookControllerSchema.safeParse(body);
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

    const book = await createBookService(data);

    res.status(201).json({
      message: "Book created sucessfully",
      isSuccess: true,
      data: book,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function updateBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const bookId = req.params.bookId;

    const { success, error, data } = UpdateBookControllerSchema.safeParse(body);
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

    const book = await updateBookService(bookId, data);

    res.status(201).json({
      message: "Book updated sucessfully",
      isSuccess: true,
      data: book,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function deleteBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookId = req.params.bookId;
    const book = await deleteBookService(bookId);

    res.status(201).json({
      message: "Book deleted sucessfully",
      isSuccess: true,
      data: book,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function getBooksController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const books = await getBooksService();
    res.status(200).json({
      message: "Books retrieved successfully",
      isSuccess: true,
      data: books,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function getBookByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bookId = req.params.bookId;
    const book = await getBookByIdService(bookId);
    res.status(200).json({
      message: "Book retrieved successfully",
      isSuccess: true,
      data: book,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}
