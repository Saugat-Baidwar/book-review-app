
import { env } from "../../config";

export type TBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  created_at: string;
};

/**
 * for add book api
 */
export type TAddBookInput = {
  Title: string;
  author: string;
  genre: string;
  description: string;
};

export type TAddBookOutput = {
  message: string;
  isSuccess: boolean;
  data: TBook;
};

export async function addBook(input: TAddBookInput): Promise<TAddBookOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/addbook`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * for update book api
 */

export type TUpdateBookInput = {
  bookId: string;
  Title: string;
  author: string;
  genre: string;
  description: string;
};

export type TUpdateBookOutput = {
  message: string;
  isSuccess: boolean;
  data: TBook;
};

export async function updateBook(
  input: TUpdateBookInput
): Promise<TUpdateBookOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/${input.bookId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * for delete book api
 */

export type TDeleteBookInput = {
  bookId: string;
};

export type TDeleteBookOutput = {
  message: string;
  isSuccess: boolean;
};

export async function deleteBook(
  input: TDeleteBookInput
): Promise<TDeleteBookOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/${input.bookId}`, {
    method: "DELETE",
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
 * for get all books api
 */

export type TGetAllBooksOutput = {
  message: string;
  isSuccess: boolean;
  data: TBook[];
};

export async function getAllBooks(): Promise<TGetAllBooksOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/allbooks/`, {
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
 * for get book by id api
 */

export type TGetBookByIdInput = {
  bookId: string;
};

export type TGetBookByIdOutput = {
  message: string;
  isSuccess: boolean;
  data: TBook;
};

export async function getBookById(
  input: TGetBookByIdInput
): Promise<TGetBookByIdOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/books/allbooks/${input.bookId}`, {
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
