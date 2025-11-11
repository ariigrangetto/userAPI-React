import { useQuery } from "@tanstack/react-query";
import getUsers from "../service/getUsers.js";
import { type USERS } from "../type.js";

export default function useUsers() {
  const { isLoading, isError, data } = useQuery<USERS[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    isLoading,
    isError,
    data: data ?? [],
  };
}
