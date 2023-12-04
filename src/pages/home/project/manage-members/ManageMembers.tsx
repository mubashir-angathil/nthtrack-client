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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";
import ManageProjectMember from "../../../../components/form/manage-project-member/ManageProjectMember";
import { useManageProjectMembers } from "./Helper";
import AvatarComponent from "../../../../components/common/avatar/AvatarComponent";

export const ManageMembers: FC = () => {
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
    <Stack component="div" gap={2} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Project Members</Typography>
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Permission</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableConfig.members.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <AvatarComponent {...row.user} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.user.username}
                </TableCell>
                <TableCell>{row.user.email}</TableCell>
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
    </Stack>
  );
};
