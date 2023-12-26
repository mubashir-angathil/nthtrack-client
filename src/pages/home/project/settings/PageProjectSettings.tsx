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
  Stack,
  Typography,
  Select,
  MenuItem,
  TablePagination,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import ManageProjectMember from "../../../../components/form/manage-project-member/ManageProjectMember";
import { useManageProjectMembers } from "./Helper";
import AvatarComponent from "../../../../components/common/avatar/AvatarComponent";

// Function Component for Managing Project Members
const PageProjectSettings: FC = () => {
  // Destructuring values from custom hook
  const {
    tableConfig,
    permissionOptions,
    handleRemoveMember,
    setTableLoading,
    handlePermissionChange,
    setDialog,
    dangerZoneItems,
    handleChangePage,
    handleChangeRowsPerPage,
  } = useManageProjectMembers();

  return (
    // Main Stack Container
    <Stack component="div" gap={2} display="flex" flexDirection="column">
      {/* Members Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
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

      {/* Table Container for Project Members */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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

      {/* Danger Zone Section */}
      <Typography variant="h4">Danger Zone</Typography>

      {/* Stack for Danger Zone Items */}
      <Stack
        border={1}
        borderColor="red"
        borderRadius={2}
        display="flex"
        justifyContent="space-between"
      >
        {/* Mapping and rendering each Danger Zone Item */}
        {dangerZoneItems.map((item, index) => {
          return (
            <Box key={index}>
              {/* Conditional rendering based on the condition */}
              {item?.condition ? (
                <>
                  {/* Danger Zone Item Title and Action Button */}
                  <Box
                    padding={2}
                    display="flex"
                    justifyContent="space-between"
                  >
                    {item.title}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={item.handler}
                    >
                      {item.button}
                    </Button>
                  </Box>

                  {/* Divider except for the last item */}
                  {item.button !== "Delete project" && <Divider />}
                </>
              ) : (
                <></>
              )}
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default PageProjectSettings;
