import { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ManageIssueForm: FC = () => {
  return (
    <Box component="form" p={2}>
      <Stack gap={2} mt={2} mb={2}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="demo-simple-select-disabled">Tracker</InputLabel>
          <Select
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            value={0}
            label="Tracker"
            size="small"
            onChange={() => {}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Bug</MenuItem>
            <MenuItem value={20}>Feature</MenuItem>
          </Select>
        </FormControl>
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

export default ManageIssueForm;
