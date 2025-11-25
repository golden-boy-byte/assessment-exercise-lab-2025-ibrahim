import { useCallback, useState } from "react";

export const useQuery = <T, P>(queryFn: (params?: P) => Promise<T[]>) => {
  const [list, setList] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const sendQuery = useCallback(
    async (params?: P) => {
      try {
        setIsLoading(true);
        setIsError(false);
        setError(null);

        const result = await queryFn(params);
        setList(result);
        return result;
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [queryFn]
  );

  return {
    sendQuery,
    list,
    isLoading,
    isError,
    error,
  };
};
