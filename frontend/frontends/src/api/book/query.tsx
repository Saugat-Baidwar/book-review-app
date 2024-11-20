
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addBook,
  deleteBook,
  getAllBooks,
  getBookById,
  TAddBookInput,
  TAddBookOutput,
  TDeleteBookInput,
  TDeleteBookOutput,
  TGetAllBooksOutput,
  TGetBookByIdInput,
  TGetBookByIdOutput,
  TUpdateBookInput,
  TUpdateBookOutput,
  updateBook,
} from "./fetch";

/**
 * for add book api
 */
export function useAddBookMutation() {
  const queryClient = useQueryClient();
  return useMutation<TAddBookOutput, Error, TAddBookInput>({
    mutationFn: addBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}

/**
 * for update book api
 */
export function useUpdateBookMutation() {
  const queryClient = useQueryClient();
  return useMutation<TUpdateBookOutput, Error, TUpdateBookInput>({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}

/**
 * for delete book api
 */
export function useDeleteBookMutation() {
  const queryClient = useQueryClient();
  return useMutation<TDeleteBookOutput, Error, TDeleteBookInput>({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
}

/**
 * for get all books api
 */
export function useGetBooksQuery() {
  return useQuery<TGetAllBooksOutput, Error>({
    queryKey: ["books"],
    queryFn: getAllBooks,
  });
}

/**
 * for get book by id api
 */
export function useGetBookByIdQuery(id: string) {
  return useQuery<TGetBookByIdOutput, Error, TGetBookByIdInput>({
    queryKey: ["books", id],
    queryFn: () => getBookById({ bookId: id }),
  });
}
