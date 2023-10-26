import { FC } from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import CKEditorComponent from "../../ck-editor/CkEditorComponent";
import { Button, FormHelperText } from "@mui/material";
import { ManageProjectFormProps, useManageProject } from "./Helper";
import RhfTextfieldComponent from "../../common/textfield/RhfTextFieldComponent";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";

const ManageProjectForm: FC<ManageProjectFormProps> = ({ updateProjects }) => {
  const { control, isSubmit, handleDialogClose, handleSubmit, onSubmit } =
    useManageProject({ updateProjects });

  return (
    <Box p={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2} mt={2} mb={2}>
        <FormHelperText sx={{ fontSize: 15 }}>Project Title *</FormHelperText>
        <RhfTextfieldComponent
          control={control}
          name="projectName"
          size="small"
          required
        />
        <CKEditorComponent
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

export default ManageProjectForm;
