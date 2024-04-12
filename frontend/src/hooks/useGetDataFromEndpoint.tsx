import { useEffect, useState } from "react";

interface UseGetDataFromEndpointReturn<T> {
  data: T | undefined;
  loading: boolean;
  error: string | undefined;
}

export const useGetDataFromEndpoint = <T,>(
  url: string
): UseGetDataFromEndpointReturn<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState<T | undefined>(undefined);
  useEffect(() => {
    let controller: AbortController | null = new AbortController();
    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/getAllRecipe`,
          {
            signal: controller?.signal,
          }
        );
        const response: T = await result.json();
        setData(response);
        controller = null;
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    getData();
  }, [url]);

  return { data, loading, error };
};
