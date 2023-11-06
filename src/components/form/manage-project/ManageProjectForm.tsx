import { FC } from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import CKEditorComponent from "../../ck-editor/CkEditorComponent";
import { Button, FormHelperText } from "@mui/material";
import { useManageProject } from "./Helper";
import RhfTextfieldComponent from "../../common/textfield/RhfTextFieldComponent";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";
import { UpdateProjectRequest } from "../../../services/project-services/Helper";

const ManageProjectForm: FC<{ values?: UpdateProjectRequest }> = ({
  values,
}) => {
  const { control, isSubmitting, handleDialogClose, handleSubmit, onSubmit } =
    useManageProject(values);

  return (
    <Box p={2} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={2} mt={2} mb={2}>
        <FormHelperText sx={{ fontSize: 15 }}>Project Title *</FormHelperText>
        <RhfTextfieldComponent
          control={control}
          name="name"
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
          <SubmitButtonComponent
            title={values ? "Update Project" : "Create Project"}
            loading={isSubmitting}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default ManageProjectForm;
