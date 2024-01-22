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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import { useManageProjectLabels } from "./Helper";
import { Edit } from "@mui/icons-material";
import { useComponentPermissionContext } from "../../../utils/helpers/context/component-permission-context/ComponentPermissionContext";

// Function Component for Managing Project labels
const ProjectLabelTableComponent: FC = () => {
  // Destructuring values from custom hook
  const {
    tableConfig,
    handleRemoveLabel,
    handleUpdateLabel,
    handleCreateLabel,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useManageProjectLabels();
  const { componentPermission } = useComponentPermissionContext();

  // Extracting permissions for label management from the componentPermission context
  const addLabelPermission = componentPermission["addNewLabel"]?.permitted;
  const updateLabelPermission = componentPermission["updateLabel"]?.permitted;
  const deleteLabelPermission = componentPermission["deleteLabel"]?.permitted;

  return (
    <TableContainer component={Paper}>
      {/* Labels Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Typography variant="h4">Labels</Typography>
        {/* Button to add a new label */}
        {addLabelPermission && (
          <Button
            variant="contained"
            sx={{ fontSize: 12 }}
            size="small"
            onClick={handleCreateLabel}
          >
            New Label
          </Button>
        )}
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="labels-table">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell align="center">Serial No</TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Label</TableCell>
            {(updateLabelPermission || deleteLabelPermission) && (
              <TableCell align="center">Actions</TableCell>
            )}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {tableConfig.labels.map((row, index) => (
            <TableRow key={row.id}>
              {/* Displaying label Information */}
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

              {/* Delete label Button */}
              {(updateLabelPermission || deleteLabelPermission) && (
                <TableCell align="center">
                  {updateLabelPermission && (
                    <IconButton
                      size="small"
                      aria-label="edit"
                      onClick={() =>
                        handleUpdateLabel({
                          row,
                        })
                      }
                    >
                      <Edit />
                    </IconButton>
                  )}
                  {deleteLabelPermission && (
                    <IconButton
                      size="small"
                      aria-label="delete"
                      color="error"
                      onClick={() =>
                        handleRemoveLabel({
                          labelId: row.id,
                        })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              )}
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

export default ProjectLabelTableComponent;
