import { env } from "../../config";

export type TReview = {
  username: string;
  _id: string;
  rating: number;
  reviewText: string;
};

/**
 * for add Review api
 */
export type TAddReviewInput = {
  bookId?: string;
  rating: number | string;
  reviewText: string;
};

export type TAddReviewOutput = {
  message: string;
  isSuccess: boolean;
  data: TReview;
};
export async function addReview(
  input: TAddReviewInput
): Promise<TAddReviewOutput> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/Reviews/addReview/${input.bookId}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: input.rating,
        reviewText: input.reviewText,
      }),
    }
  );

  const data = await res
    .json()
    .catch((err) => console.error("Error parsing JSON:", err));

  if (!res.ok) {
    console.error("Failed to fetch:", data);
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
}

/**
 * for update Review api
 */

export type TUpdateReviewInput = {
  ReviewId: string;
  rating: number;
  reviewText: string;
};

export type TUpdateReviewOutput = {
  message: string;
  isSuccess: boolean;
  data: TReview;
};//SA

export async function updateReview(
  input: TUpdateReviewInput
): Promise<TUpdateReviewOutput> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/reviews/updateReview/${input.ReviewId}`,
    {
      method: "Put",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

/**
 * for delete Review api
 */

export type TDeleteReviewInput = {
  ReviewId: string;
};

export type TDeleteReviewOutput = {
  message: string;
  isSuccess: boolean;
};

export async function deleteReview(
  input: TDeleteReviewInput
): Promise<TDeleteReviewOutput> {
  const res = await fetch(
    `${env.BACKEND_URL}/api/Reviews/deleteReview/${input.ReviewId}`,
    {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

// fetch.ts
export type TGetReviewByIdInput = {
  bookId: string;
};

export type TGetReviewByIdOutput = {
  message: string;
  isSuccess: boolean;
  data: TReview[]; // Array of reviews for the specific book
};

export async function getReviewById(
  input: TGetReviewByIdInput
): Promise<TGetReviewByIdOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/Reviews/getReview/${input.bookId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json(); // Assuming the backend returns the reviews for the specific book
}

/**
 * for get all Reviews api
 */

export type TGetAllReviewsOutput = {
  message: string;
  isSuccess: boolean;
  data: TReview[];
};

export async function getAllReviews(): Promise<TGetAllReviewsOutput> {
  const res = await fetch(`${env.BACKEND_URL}/api/Reviews`, {
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