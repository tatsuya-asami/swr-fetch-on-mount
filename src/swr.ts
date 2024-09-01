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
  const response = useFetchSWR<User>(
    userId ? `${ENDPOINTS.USERS}/${userId}` : null
  );
  return {
    ...response,
    data: {
      user: response.data,
    },
  };
};
export const useFetchPost = (
  postId: number | undefined,
  config?: SWRConfiguration
) => {
  return useFetchSWR<Post>(
    postId ? `${ENDPOINTS.POSTS}/${postId}` : null,
    config
  );
};

export const useFetchPostByMutation = () => {
  type Query = { postId: number | undefined };
  const getPosts = async (path: string, { arg }: { arg: Query }) => {
    const { postId } = arg;
    if (!postId) {
      return;
    }
    return fetch(postId ? `${path}/${postId}` : path).then((r) => r.json());
  };

  return useSWRMutation<Post, any, string, Query>(ENDPOINTS.POSTS, getPosts);
};
