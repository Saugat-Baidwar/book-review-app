import { z } from "zod";

export const RegisterControllerSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(25),
});
export type TRegisterControllerInput = z.TypeOf<
  typeof RegisterControllerSchema
>;

export const LoginControllerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(25),
});
export type TLoginControllerInput = z.TypeOf<typeof LoginControllerSchema>;

export const LogoutControllerSchema = z.object({});
export type TLogoutControllerInput = z.TypeOf<typeof LogoutControllerSchema>;