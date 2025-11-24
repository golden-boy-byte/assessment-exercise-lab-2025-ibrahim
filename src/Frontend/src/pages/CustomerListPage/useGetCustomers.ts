import { useState, useCallback } from "react";
import toQueryParams from "../../utils/toQueryParams";

interface CustomerCategory {
  code: string;
  description: string;
}
interface Customer {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  iban: string;
  category: CustomerCategory | null;
}

export const useGetCustomers = () => {
  const [list, setList] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const getCustomers = useCallback(
    async (query: { name: string; email: string }): Promise<Customer[]> => {
      try {
        setIsLoading(true);
        const queryParams = toQueryParams(query);
        const response = await fetch(`/api/customers/list${queryParams}`);
        const data = await response.json();
        setList(data);
        return Promise.resolve(data);
      } catch (err) {
        setError(err);
        setIsError(true);
        return Promise.reject(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    getCustomers,
    list,
    isLoading,
    isError,
    error,
  };
};
