import { useEffect, useRef } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import Loader from "../../components/Loader";
import exportListAsXML from "../../utils/exportAsXMLFile";
import { useGetCustomers } from "./useGetCustomers";
import Filters from "./components/Filters";

const isEmailValid = (email: string) =>
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function CustomerListPage() {
  const { getCustomers, list, isLoading } = useGetCustomers();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSearch = (name: string, email: string) => {
    if (email && isEmailValid(email)) {
      alert("The email address is not valid");
      return;
    }

    getCustomers({ name, email });
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

  useEffect(() => {
    getCustomers({
      name: nameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
    });
  }, [getCustomers]);

  return (
    <>
      <Loader isActive={isLoading} />
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Customers
      </Typography>

      <Filters onExport={handleExport} onSearch={handleSearch} />

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 500, overflow: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="customers table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell>Address</StyledTableHeadCell>
              <StyledTableHeadCell>Email</StyledTableHeadCell>
              <StyledTableHeadCell>Phone</StyledTableHeadCell>
              <StyledTableHeadCell>Iban</StyledTableHeadCell>
              <StyledTableHeadCell>Category Code</StyledTableHeadCell>
              <StyledTableHeadCell>Category Description</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data available
                </TableCell>
              </TableRow>
            ) : (
              list.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.iban}</TableCell>
                  <TableCell>{row.category?.code ?? "N/A"}</TableCell>
                  <TableCell>{row.category?.description ?? "N/A"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));
