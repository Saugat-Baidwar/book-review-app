import bcrypt from "bcryptjs";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { env } from "./config";

export type TUserRole = "admin" | "user";

export async function hashPassword(password: string) {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  const isCompared = await bcrypt.compare(password, hashedPassword);
  return isCompared;
}

export type TTokenPayload = {
  id: string;
  username: string;
  email: string;
  role: TUserRole;
};

const secretKey = env.JWT_SECRET;

export function generateToken(payload: TTokenPayload) {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60, // 1 hour
  });
  return token;
}

export function verifyToken(token: string) {
  try {
    const verified = jwt.verify(token, secretKey);
    return {
      isValid: true,
      message: "token verified successfully",
      payload: verified,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof TokenExpiredError) {
      return {
        isValid: false,
        message: error.message,
        payload: null,
      };
    } else if (error instanceof JsonWebTokenError) {
      return {
        isValid: false,
        message: error.message,
        payload: null,
      };
    }
    return {
      isValid: false,
      message: "something went wrong when verifying token",
      payload: null,
    };
  }
}