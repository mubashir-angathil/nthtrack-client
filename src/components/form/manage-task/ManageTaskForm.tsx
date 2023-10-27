import { FC } from "react";
import Box from "@mui/material/Box";
import { Stack, FormHelperText, Button } from "@mui/material";
import RhfCKEditorComponent from "../../ck-editor/CkEditorComponent";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";
import { useManageTask } from "./Helper";
import RhfSelectComponent from "../../common/textfield/select/RhfSelectComponent";

const ManageTaskForm: FC = () => {
  const { control, isSubmit, handleDialogClose, handleSubmit, onSubmit } =
    useManageTask();
  return (
    <Box component="form" p={2} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2} mt={2} mb={2}>
        <FormHelperText sx={{ fontSize: 15 }}>Tracker *</FormHelperText>
        <RhfSelectComponent
          control={control}
          name="trackerId"
          size="small"
          required
        />
        <RhfCKEditorComponent
          control={control}
          label="Description"
          name="description"
          required
        />
        <Box display="flex" justifyContent="end" columnGap={1}>
          <Button variant="outlined" color="error" onClick={handleDialogClose}>
            Close
          </Button>
          <SubmitButtonComponent title="Create Project" loading={isSubmit} />
        </Box>
      </Stack>
    </Box>
  );
};

export default ManageTaskForm;
