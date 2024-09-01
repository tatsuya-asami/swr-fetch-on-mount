import useSWR, { SWRConfiguration, Key, SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";
import { ENDPOINTS, Link, Post, User } from "./api/handlers";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const useFetchSWR = <Data, Error = any, SWRKey extends Key = Key>(
  key: SWRKey,
  config?: SWRConfiguration
): SWRResponse<Data, Error> => {
  return useSWR(key, fetcher, config);
};

export const useFetchUsers = (userId: number | undefined) => {
  const query = userId
    ? new URLSearchParams({ userId: userId.toString() })
    : undefined;

  return useFetchSWR<User>(
    query ? `${ENDPOINTS.USERS}?${query}` : ENDPOINTS.USERS
  );
};
export const useFetchPosts = (
  users: User | undefined,
  userId: number | undefined
) => {
  const query = userId ? `?userId=${userId}` : "";
  return useFetchSWR<Post[]>(users ? `${ENDPOINTS.POSTS}${query}` : null);
};
export const useFetchLinks = () => {
  return useFetchSWR<Link[]>(ENDPOINTS.LINKS);
};

export const useFetchPostsByMutation = () => {
  type Query = { postIds: number[] };
  const getPosts = async (path: string, { arg }: { arg: Query }) => {
    const query = arg.postIds
      ? new URLSearchParams({ postIds: arg.postIds.toString() })
      : undefined;
    return fetch(arg.postIds ? `${path}?${query}` : path).then((r) => r.json());
  };

  return useSWRMutation<Post[], any, string, Query>(ENDPOINTS.POSTS, getPosts);
};
