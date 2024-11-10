import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { env } from "./utils/config";
import { APIError } from "./utils/error";
import { authRouter } from "./modules/auth/router";
import cookieParser from "cookie-parser";
import { createDBConnection } from "./utils/db";

import { reviewRouter } from "./modules/review/router";
import { bookRouter } from "./modules/books/router";

createDBConnection()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Welcome to Book Review App",
    data: null,
    isSuccess: true,
  });
});

// authentication routes
app.use("/api/auth", authRouter);

// book routes
app.use("/api/books", bookRouter);

// review routes
app.use("/api/reviews", reviewRouter);

app.use((error: APIError, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  if (error instanceof APIError) {
    res.status(error.status).json({
      message: error.message,
      data: null,
      isSuccess: false,
    });
    return;
  }
  res.status(500).json({
    message: "Internal server error",
    data: null,
    isSuccess: false,
  });
});

app.listen(env.PORT, () =>
  console.log(`Server started on: http://localhost:${env.PORT}`)
);
