import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Paper,
} from "@mui/material";

const DataTable = ({ data, columns }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "70vh",
        maxWidth: 1000,
        overflow: "auto",
        margin: "auto",
      }}
    >
      <Paper
        sx={{
          maxWidth: 1000,
          overflow: "auto",
          margin: "auto",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5", // Change color as needed
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={`${index}-${column.field}`}>
                    {row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default DataTable;
