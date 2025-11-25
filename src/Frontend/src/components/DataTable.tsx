import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  styled,
  tableCellClasses,
} from "@mui/material";

export interface Column<T> {
  label: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  height?: number;
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));

export function DataTable<T>({
  columns,
  data,
  height = 500,
}: DataTableProps<T>) {
  if (!data.length) {
    return (
      <Paper
        sx={{
          height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" color="text.secondary">
          No data available
        </Typography>
      </Paper>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ height, overflow: "auto" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col, idx) => (
              <StyledTableHeadCell key={idx}>{col.label}</StyledTableHeadCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((col, cIdx) => (
                <TableCell key={cIdx}>{col.render(row)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
