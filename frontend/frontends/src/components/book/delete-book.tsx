import { useDeleteBookMutation } from "../../api/book/query";
import { errorToast, successToast } from "../toaster";
import { useState } from "react";

export function DeleteBook({ bookId }: { bookId: string }) {
  const deleteBookMutation = useDeleteBookMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteBoook = async () => {
    if (isDeleting) return; // Prevent multiple clicks

    setIsDeleting(true);
    try {
      await deleteBookMutation.mutateAsync(
        {
          bookId: bookId,
        },
        {
          onSuccess() {
            successToast("Book deleted successfully");
          },
          onError(error) {
            console.error("error", error);
            errorToast(error.message);
          },
        }
      );
    } catch (error) {
      console.error("error", error);
      errorToast("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => deleteBoook()}
        className={`bg-amber-700 text-white text-sm px-4 py-2 rounded-lg shadow-md hover:bg-amber-500 transition-all ${
          isDeleting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </>
  );
}