import { useEffect } from "react";
import { Typography } from "@mui/material";
import Filters from "./components/Filters";
import { DataTable, type Column } from "../../components/DataTable";
import Loader from "../../components/Loader";
import { useQuery } from "../../hooks/useQuery";
import exportListAsXML from "../../utils/exportAsXMLFile";
import { type Customer, getCustomers } from "./getCustomers";

const isEmailValid = (email: string) =>
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function CustomerListPage() {
  const { sendQuery, isLoading, list } = useQuery(getCustomers);

  const handleSearch = (name: string, email: string) => {
    if (email && isEmailValid(email)) {
      alert("The email address is not valid");
      return;
    }

    sendQuery({ name, email });
  };

  const handleExport = () => {
    if (!list.length) return;
    exportListAsXML({
      data: list,
      filename: "customers",
      columns: [
        { label: "Name", value: (c) => c.name },
        { label: "Address", value: (c) => c.address },
        { label: "Email", value: (c) => c.email },
        { label: "Phone", value: (c) => c.phone },
        { label: "Iban", value: (c) => c.iban },
        { label: "Category_Code", value: (c) => c.category?.code || "N/A" },
        {
          label: "Category_Description",
          value: (c) => c.category?.description || "N/A",
        },
      ],
    });
  };

  const columns: Column<Customer>[] = [
    { label: "Name", render: (c) => c.name },
    { label: "Address", render: (c) => c.address },
    { label: "Email", render: (c) => c.email },
    { label: "Phone", render: (c) => c.phone },
    { label: "Iban", render: (c) => c.iban },
    { label: "Category Code", render: (c) => c.category?.code ?? "N/A" },
    {
      label: "Category Description",
      render: (c) => c.category?.description ?? "N/A",
    },
  ];

  useEffect(() => {
    sendQuery();
  }, [sendQuery]);

  return (
    <>
      <Loader isActive={isLoading} />
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Customers
      </Typography>
      <Filters onExport={handleExport} onSearch={handleSearch} />
      <DataTable columns={columns} data={list} height={500} />
    </>
  );
}
