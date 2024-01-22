import { FC } from "react";
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
  Select,
  MenuItem,
  TablePagination,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ProjectMemberTableComponentProps,
  useManageProjectMembers,
} from "./Helper";
import AvatarComponent from "../../common/avatar/AvatarComponent";
import { Add, Block } from "@mui/icons-material";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";

// Function Component for Managing Project Members
const ProjectMemberTableComponent: FC<ProjectMemberTableComponentProps> = (
  props,
) => {
  // Destructuring values from custom hook
  const {
    tableConfig,
    permissionOptions,
    componentPermission,
    handleRemoveMember,
    handlePermissionChange,
    handleOpenDialog,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useManageProjectMembers(props);

  // Media query
  const matches = useMediaQuery("(min-width:600px)");

  // Extracting permissions for member management from the componentPermission context
  const addMemberPermission = componentPermission["addNewMember"]?.permitted;
  const updateMemberPermission = componentPermission["updateMember"]?.permitted;
  const deleteMemberPermission = componentPermission["deleteMember"]?.permitted;

  return (
    <TableContainer component={Paper}>
      {/* Members Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <Typography variant="h4">Members</Typography>
        {/* Button to add a new member */}
        {addMemberPermission &&
          (matches ? (
            <Button
              variant="contained"
              sx={{ fontSize: 12 }}
              size="small"
              onClick={handleOpenDialog}
            >
              New Member
            </Button>
          ) : (
            <Tooltip title="Add New Member">
              <IconButton
                size="small"
                onClick={handleOpenDialog}
                sx={{ backgroundColor: "primary.main" }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Tooltip>
          ))}
      </Box>
      <Table sx={{ minWidth: 650 }} aria-label="members-table">
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Permission</TableCell>
            {deleteMemberPermission && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {tableConfig.members.map((row, index) => (
            <TableRow key={row.id}>
              {/* Displaying Member Information */}
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <AvatarComponent
                  {...row.user}
                  color={generalFunctions.getColor(index)}
                  width={30}
                  height={30}
                />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.user.username}
              </TableCell>
              <TableCell>{row.user.email}</TableCell>
              <TableCell>
                {row.status === "Pending"
                  ? row.status.concat("...")
                  : row.status}
              </TableCell>

              {/* Permission Selection Dropdown */}
              <TableCell>
                {row.status === "Super Admin" || !updateMemberPermission ? (
                  row.status
                ) : (
                  <Select
                    value={row.permission.id}
                    onChange={(e) =>
                      handlePermissionChange({
                        memberId: row.id,
                        permissionId: parseInt(e.target.value as string),
                        userId: row.user.id,
                      })
                    }
                    sx={{ borderRadius: 5, height: 28 }}
                    size="small"
                  >
                    {permissionOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </TableCell>

              {/* Delete Member Button */}
              {deleteMemberPermission && (
                <TableCell>
                  {row.permission.name.includes("Super Admin") ? (
                    <Block />
                  ) : (
                    <IconButton
                      size="small"
                      aria-label="delete"
                      color="error"
                      onClick={() =>
                        handleRemoveMember({
                          memberId: row.id,
                          userId: row.user.id,
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

export default ProjectMemberTableComponent;
