import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation from "swr/mutation";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFetchSWR = (key: string, config?: SWRConfiguration) => {
  return useSWR(key, fetcher, config);
};

export const useFetchSWRMutation = (key: string) => {
  return useSWRMutation(key, fetcher);
};
