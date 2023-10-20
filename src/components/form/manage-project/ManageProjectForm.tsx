import { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/system";

const ManageProjectForm: FC = () => {
  return (
    <Box component="form" p={2}>
      <Stack gap={2} mt={2} mb={2}>
        <TextField
          label="Project title"
          variant="outlined"
          size="small"
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          size="small"
          multiline
          rows={5}
        />
      </Stack>
    </Box>
  );
};

export default ManageProjectForm;
