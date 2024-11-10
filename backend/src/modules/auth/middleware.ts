import { Request, Response, NextFunction } from "express";
import { TTokenPayload, verifyToken } from "../../utils/auth";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookies = req.cookies;

  const token = (cookies?.token as string) || "";

  if (!token) {
    res.status(401).json({
      message: "Cookie not found or is invalid",
      isSuccess: false,
      data: null,
    });
    return;
  }

  if (!token) {
    res.status(401).json({
      message: "Token not found or is invalid",
      isSuccess: false,
      data: null,
    });
    return;
  }

  const verifyTokenOutput = verifyToken(token);

  if (!verifyTokenOutput.isValid) {
    res.status(401).json({
      message: verifyTokenOutput.message,
      isSuccess: false,
      data: null,
    });
    return;
  }

  if (!verifyTokenOutput.payload) {
    res.status(401).json({
      message: "Invalid token",
      isSuccess: false,
      data: null,
    });
    return;
  }

  const payload = verifyTokenOutput.payload as TTokenPayload;

  req.user = {
    id: payload.id,
    username: payload.username,
    email: payload.email,
    role: payload.role,
  };

  next();
}

export async function checkAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.role !== "admin") {
    res.status(403).json({
      message: "Unauthorized: Not an admin",
      isSuccess: false,
      data: null,
    });
    return;
  }

  next();
}