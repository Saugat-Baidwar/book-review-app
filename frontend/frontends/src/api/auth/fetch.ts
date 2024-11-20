
import { env } from "../../config";

/**
 * For register api
 */
export type TRegisterUserOutput = {
  message: string;
  isSuccess: boolean;
  data: { username: string; email: string; id: string };
};

export type TRegisterUserInput = {
  username: string;
  email: string;
  password: string;
};

export async function registerUser(
  input: TRegisterUserInput
): Promise<TRegisterUserOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: input.username,
      email: input.email,
      password: input.password,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * For login api
 */
export type TUserRole = "admin" | "user";

export type TLoginUserOutput = {
  message: string;
  isSuccess: boolean;
  data: { username: string; email: string; id: string; role: TUserRole };
};

export type TLoginUserInput = {
  email: string;
  password: string;
};

export async function loginUser(
  input: TLoginUserInput
): Promise<TLoginUserOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      password: input.password,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * For me api
 */
export type TMeOutput = {
  message: string;
  isSuccess: boolean;
  data: { username: string; email: string; id: string; role: TUserRole };
};

export async function me(): Promise<TMeOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/auth/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * For logout api
 */
export type TLogoutOutput = {
  message: string;
  isSuccess: boolean;
};

export async function logout(): Promise<TLogoutOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
