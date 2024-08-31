import useSWR, {SWRConfiguration} from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useFetchSWR = (key: string, config?: SWRConfiguration) => {
  return useSWR(key, fetcher, config);
}