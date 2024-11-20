
import { useGetBooksQuery } from "../../api/book/query";
import { DeleteBooks } from "./delete-book";

export function ListBooks() {
  const { data, isLoading, isError, error } = useGetBooksQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border p-4 shadow-sm">
      {data?.data.map((book) => (
        <div key={book._id}>
          <p className="font-bold text-lg">{book.title}</p>
          <p className="text-sm italic">Author: {book.author}</p>
          <p className="text-sm italic">Genre: {book.genre}</p>
          <p>{book.description}</p>
          <button> <DeleteBooks bookId={""}/></button>
        </div>
      ))}
    </div>
  );
}
