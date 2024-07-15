import useSWR from 'swr';


const fetcher = (url: string) => {
  console.log("useFetchData", url);

  return fetch(url).then(res => res.json())
};


export const useFetchData = (url: string) => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(url ? url : null, fetcher)
  return {
    data,
    isLoading,
    isValidating,
    error,
    mutate
  };
};
