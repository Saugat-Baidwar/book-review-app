import { Request, Response, NextFunction } from "express";
import { LoginControllerSchema, RegisterControllerSchema } from "./validation";
import { createUserService, getUserById, loginService } from "./service";
import { APIError } from "../../utils/error";
import { updateUserRoleservice } from "../books/service";

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;


    const { success, error, data } = RegisterControllerSchema.safeParse(body);
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

    const user = await createUserService(data);
    
    

    res.status(201).json({
      message: "User registered successfully",
      isSuccess: true,
      data: {
        username: user.username,
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const { success, error, data } = LoginControllerSchema.safeParse(body);
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

    const loginOutput = await loginService(data);

    res.cookie("token", loginOutput.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hour
      path: "/",
    });

    res.status(200).json({
      message: "User logged in successfully",
      isSuccess: true,
      data: loginOutput,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully",
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function meController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "User not found",
        isSuccess: false,
        data: null,
      });
      return;
    }

    const user = await getUserById(req.user.id);

    res.status(200).json({
      message: "User retrieved successfully",
      isSuccess: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function updateRoleController(req:Request,res:Response,next:NextFunction){
  try{
    const role = req.body.role;
    const userId = req.body.userId;

    console.log("checking.......",userId);

    const User = await updateUserRoleservice({
      userId : userId ||  "",
      role:role || "user",
    });
    res.status(200).json({
      message:"role has been update",
      isSuccess:true,
      data:null,
    })
  }catch(e){
    if (e instanceof APIError){
      next(e);
    }else{
      next(new APIError(500,(e as Error).message))
    }
  }
}