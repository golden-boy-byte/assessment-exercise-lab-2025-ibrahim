import { Typography } from "@mui/material";
import Loader from "../components/Loader";
import { Column, DataTable } from "../components/DataTable";
import { useQuery } from "../hooks/useQuery";

interface Supplier {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
}

const getSuppliers = async (): Promise<Supplier[]> => {
  const response = await fetch(`/api/suppliers/list`);
  const data = await response.json();
  return Promise.resolve(data);
};

export default function SupplierListPage() {
  const { list, isLoading } = useQuery(getSuppliers);

  const columns: Column<Supplier>[] = [
    { label: "Name", render: (s) => s.name },
    { label: "Address", render: (s) => s.address },
    { label: "Email", render: (s) => s.email },
    { label: "Phone", render: (s) => s.phone },
  ];

  return (
    <>
      <Loader isActive={isLoading} />
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Suppliers
      </Typography>

      <DataTable columns={columns} data={list} height={500} />
    </>
  );
}
