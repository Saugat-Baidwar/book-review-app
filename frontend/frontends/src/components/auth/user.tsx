import { useMeQuery } from "../../api/auth/query";

export const userData = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

export function User() {
  const { data, isLoading, isError, error } = useMeQuery();

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (isError) {
    return <div className="text-white">{error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div className="flex-shrink-0 flex items-center">
      <img
        alt={data.data.username}
        src={userData.imageUrl}
        className="h-8 w-8 rounded-full"
      />
      <span className="ml-3 font-medium text-white">{data.data.username}</span>
    </div>
  );
}