import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addReview,
  deleteReview,
  getReviewById,
  TAddReviewInput,
  TAddReviewOutput,
  TDeleteReviewInput,
  TDeleteReviewOutput,
  TGetReviewByIdOutput,
  TUpdateReviewInput,
  TUpdateReviewOutput,
  updateReview,
} from "./fetch";

/**
 * for add Review api
 */
export function useAddReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation<TAddReviewOutput, Error, TAddReviewInput>({
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reviews"] });
    },
  });
}


/**
 * for update Review api
 */
export function useUpdateReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation<TUpdateReviewOutput, Error, TUpdateReviewInput>({
    mutationFn: updateReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reviews"] });
    },
  });
}
/**
 * for delete Review api
 */
export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();
  return useMutation<TDeleteReviewOutput, Error, TDeleteReviewInput>({
    mutationFn: deleteReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Reviews"] });
    },
  });
}

// query.ts
export function useGetReviewByIdQuery(bookId: string) {
  return useQuery<TGetReviewByIdOutput, Error>({
    queryKey: ["Reviews", bookId], // Key is now linked to the specific bookId
    queryFn: () => getReviewById({ bookId }), // Pass the bookId to the fetch function
  });
}