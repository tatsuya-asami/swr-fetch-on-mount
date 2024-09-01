import useSWR, { SWRConfiguration, Key, SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";
import { ENDPOINTS, Post, User } from "./api/handlers";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const useFetchSWR = <Data, Error = any, SWRKey extends Key = Key>(
  key: SWRKey,
  config?: SWRConfiguration
): SWRResponse<Data, Error> => {
  return useSWR(key, fetcher, config);
};

export const useFetchUsers = () => {
  return useFetchSWR<User[]>(ENDPOINTS.USER);
};
export const useFetchPosts = (
  users: User[] | undefined,
  userId: number | undefined
) => {
  const query = userId ? `?userId=${userId}` : "";
  return useFetchSWR<User[]>(users ? `${ENDPOINTS.POSTS}${query}` : null);
};

export const useFetchPostsByMutation = () => {
  type Query = { userId: number };
  const getPosts = async (path: string, { arg }: { arg: Query }) => {
    const query = arg.userId
      ? new URLSearchParams({ userId: arg.userId.toString() })
      : undefined;
    return fetch(arg.userId ? `${path}?${query}` : path).then((r) => r.json());
  };

  return useSWRMutation<Post[], any, string, Query>(ENDPOINTS.POSTS, getPosts);
};
