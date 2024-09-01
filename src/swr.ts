import useSWR, { SWRConfiguration, Key, SWRResponse } from "swr";
import useSWRMutation from "swr/mutation";
import { ENDPOINTS, Post, User } from "./api/api";

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
  const response = useFetchSWR<User>(
    query ? `${ENDPOINTS.USERS}?${query}` : ENDPOINTS.USERS
  );
  return {
    ...response,
    data: {
      list: response.data,
    },
  };
};
export const useFetchPosts = (
  postIds: number[] | undefined,
  config?: SWRConfiguration
) => {
  const query = postIds
    ? new URLSearchParams({ postIds: postIds.toString() })
    : undefined;
  return useFetchSWR<Post[]>(
    postIds ? `${ENDPOINTS.POSTS}?${query}` : null,
    config
  );
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
