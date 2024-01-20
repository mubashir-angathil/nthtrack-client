import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Box,
  Typography,
  TablePagination,
  Chip,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import { useManageProjectStatuses } from "./Helper";
import { Add, Edit } from "@mui/icons-material";

// Function Component for Managing Project statuses
const ProjectStatusTableComponent: FC = () => {
  // Destructuring values from custom hook
  const {
    tableConfig,
    handleRemoveStatus,
    handleUpdateStatus,
    handleCreateStatus,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useManageProjectStatuses();

  // Media query
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <TableContainer component={Paper}>
      {/* Status Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Typography variant="h4">Statuses</Typography>
        {/* Button to add a new status */}
        {matches ? (
          <Button
            variant="contained"
            sx={{ fontSize: 12 }}
            size="small"
            onClick={handleCreateStatus}
          >
            New Status
          </Button>
        ) : (
          <Tooltip title="New Status">
            <IconButton
              size="small"
              onClick={handleCreateStatus}
              sx={{ backgroundColor: "primary.main" }}
            >
              <Add fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="status-table">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell align="center">Serial No</TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {tableConfig.statuses.map((row, index) => (
            <TableRow key={row.id}>
              {/* Displaying status Information */}
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">
                <Chip
                  label={row.name}
                  sx={{
                    border: `2px solid rgb(${row.color})`,
                    background: `rgba(${row.color},0.2)`,
                  }}
                />
              </TableCell>

              {/* Delete status Button */}
              <TableCell align="center">
                <IconButton
                  size="small"
                  aria-Status="edit"
                  onClick={() =>
                    handleUpdateStatus({
                      row,
                    })
                  }
                >
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  aria-Status="delete"
                  color="error"
                  onClick={() =>
                    handleRemoveStatus({
                      statusId: row.id,
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination for the Table */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableConfig.totalRows}
        rowsPerPage={tableConfig.limit}
        page={tableConfig.page - 1}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ProjectStatusTableComponent;
