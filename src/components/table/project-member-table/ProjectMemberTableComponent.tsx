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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import { useManageProjectMembers } from "./Helper";
import AvatarComponent from "../../common/avatar/AvatarComponent";
import ManageProjectMember from "../../form/manage-project-member/ManageProjectMember";

// Function Component for Managing Project Members
const ProjectMemberTableComponent: FC = () => {
  // Destructuring values from custom hook
  const {
    tableConfig,
    permissionOptions,
    handleRemoveMember,
    setTableLoading,
    handlePermissionChange,
    setDialog,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useManageProjectMembers();

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
        <Button
          variant="contained"
          sx={{ fontSize: 12 }}
          size="small"
          onClick={() =>
            setDialog({
              open: true,
              form: {
                body: <ManageProjectMember refresh={setTableLoading} />,
                title: "New Member",
              },
            })
          }
        >
          New Member
        </Button>
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
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {tableConfig.members.map((row) => (
            <TableRow key={row.id}>
              {/* Displaying Member Information */}
              <TableCell>{row.id}</TableCell>
              <TableCell>
                <AvatarComponent {...row.user} />
              </TableCell>
              <TableCell component="th" scope="row">
                {row.user.username}
              </TableCell>
              <TableCell>{row.user.email}</TableCell>
              <TableCell>pending..</TableCell>

              {/* Permission Selection Dropdown */}
              <TableCell>
                <Select
                  disabled={row.permission.name.includes("Super Admin")}
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
              </TableCell>

              {/* Delete Member Button */}
              <TableCell>
                <IconButton
                  disabled={row.permission.name.includes("Super Admin")}
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

export default ProjectMemberTableComponent;
