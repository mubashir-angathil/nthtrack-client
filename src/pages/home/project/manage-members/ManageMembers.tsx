import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Select,
  IconButton,
  Button,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC, useState } from "react";
import { useDialogContext } from "../../../../utils/helpers/context/dialog-context/DialogContext";
import ManageProjectMember from "../../../../components/form/manage-project-member/ManageProjectMember";
import { Location, Params, useLocation, useParams } from "react-router-dom";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";

const permissionOptions = ["view", "create", "update", "Admin"];

function createData(
  id: number,
  username: string,
  email: string,
  avatar: string,
  permission: string,
) {
  return { id, avatar, username, email, permission };
}

const rows = [
  createData(1, "avatar1", "User1", "user1@gmail.com", "view"),
  createData(2, "avatar2", "User2", "user2@gmail.com", "create"),
  // Add more rows as needed
];

export const ManageMembers: FC = () => {
  const [members, setMembers] = useState(rows);
  const location: Location = useLocation();
  const params: Params = useParams();
  const [projectId] = useState<number | null>(
    typeof params?.projectId === "string" ? parseInt(params?.projectId) : null,
  );
  const { setDialog } = useDialogContext();
  const handlePermissionChange = (id: number, value: string) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, permission: value } : member,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.id !== id),
    );
  };

  // Validate Whether projectId is null
  // If projectId become null then call browser back otherwise assign projectId to react router location state
  useEffect(() => {
    if (projectId) {
      location.state = { projectId };
    } else {
      generalFunctions.goBack();
    }
  }, [location, projectId]);
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
                body: <ManageProjectMember />,
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
              <TableCell>No</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Permission</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((row, index) => (
              <TableRow
                key={row.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.avatar}</TableCell>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>
                  <Select
                    value={row.permission}
                    onChange={(e) =>
                      handlePermissionChange(row.id, e.target.value as string)
                    }
                    sx={{ borderRadius: 5, height: 28 }}
                    size="small"
                  >
                    {permissionOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
