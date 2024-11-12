import { APIError } from "../../utils/error";
import { UserModel } from "../auth/model";
import { BookModel } from "./model";
import {
  TAddBookControllerInput,
  TUpadateUserRole,
  TUpdateBookControllerInput,
} from "./validation";

export async function createBookService(input: TAddBookControllerInput) {
  const { title, genre, author, description } = input;

  const book = await BookModel.findOne({ title });
  if (book) {
    throw APIError.conflict("Book already exists");
  }

  const newBook = new BookModel({
    title,
    genre,
    author,
    description,
  });

  await newBook.save();

  return newBook;
}

export async function updateBookService(
  bookId: string,
  input: TUpdateBookControllerInput
) {
  const { title, genre, author, description } = input;

  const book = await BookModel.findById(bookId);
  if (!book) {
    throw APIError.notFound("Book not found");
  }

  book.title = title;
  book.genre = genre;
  book.author = author;
  book.description = description;

  await book.replaceOne({ _id: bookId });

  return book;
}

export async function deleteBookService(id: string) {
  const book = await BookModel.findByIdAndDelete(id);
  if (!book) {
    throw APIError.notFound("Book not found");
  }

  await BookModel.deleteOne({ _id: id });

  return book;
}

export async function getBooksService() {
  const books = await BookModel.find();
  return books;
}

export async function getBookByIdService(id: string) {
  const book = await BookModel.findById(id);
  if (!book) {
    throw APIError.notFound("Book not found");
  }

  return book;
}

export async function updateUserRoleservice(input:TUpadateUserRole) {
  const { role, userId } = input;

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    throw APIError.notFound("user not found");
  }

  const result = await UserModel.findByIdAndUpdate(userId, {
    $set: {
      id: userId,
      role: role,
    },
  });

  

  return true;
}
  