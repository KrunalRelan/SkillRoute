import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";

// Define a generic type for data rows
export type GenericRow<T> = T & { id: string | number };

// Define column type
export type TableColumn<T> = {
  field: keyof T;
  headerName: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T) => React.ReactNode; // Optional custom rendering
};

type GenericTableProps<T> = {
  columns?: TableColumn<T>[]; // Marked optional for default values
  data?: GenericRow<T>[]; // Marked optional for default values
  loading?: boolean;
  error?: string | null;
  title?: string;
  onRowClick?: (row: T) => void;
};

const GenericTable = <T extends Record<string, any>>({
  columns = [], // Default to empty array to avoid "map" on undefined
  data = [], // Default to empty array to avoid "map" on undefined
  loading = false,
  error = null,
  title = "Table",
  onRowClick,
}: GenericTableProps<T>) => {
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Typography variant="h6" sx={{ margin: 2 }}>
        {title}
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="generic table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field as string}
                  align={column.align || "left"}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ cursor: onRowClick ? "pointer" : "default" }}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${row.id}-${String(column.field)}`}
                    align={column.align || "left"}
                  >
                    {column.render
                      ? column.render(row[column.field], row)
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}

            {/* Show a message if no data */}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default GenericTable;
