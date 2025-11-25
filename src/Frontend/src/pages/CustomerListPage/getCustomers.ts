import toQueryParams from "../../utils/toQueryParams";

type Query = {
  name?: string;
  email?: string;
};

interface CustomerCategory {
  code: string;
  description: string;
}
export interface Customer {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  iban: string;
  category: CustomerCategory | null;
}

export const getCustomers = async (query?: Query): Promise<Customer[]> => {
  const queryParams = toQueryParams(query);
  const response = await fetch(`/api/customers/list${queryParams}`);
  const data = await response.json();
  return Promise.resolve(data);
};
