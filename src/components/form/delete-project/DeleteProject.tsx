// Importing necessary dependencies and components
import React from "react";
import { Box, Button, FormHelperText, Stack, TextField } from "@mui/material";
import { useDeleteProject } from "./Helper";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";

// Component for deleting a project
const DeleteProject: React.FC = () => {
  // Destructuring values and functions from the custom hook
  const {
    project,
    handleChange,
    handleSubmit,
    handleDialogClose,
    isMatchProjectName,
  } = useDeleteProject();

  // Rendering the delete project form
  return (
    <Stack gap={2} width={350} component="form" onSubmit={handleSubmit}>
      <FormHelperText sx={{ userSelect: "none" }}>
        To drop the project, type the project name "{project?.name}".
      </FormHelperText>
      <TextField size="small" fullWidth onChange={(e) => handleChange(e)} />
      {/* Button section for cancel and submit */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="end"
        gap={2}
        mt={1}
      >
        <Button
          variant="outlined"
          color="error"
          size="medium"
          autoFocus
          onClick={handleDialogClose}
        >
          Cancel
        </Button>
        {/* Submit button component with dynamic disabling based on project name match */}
        <SubmitButtonComponent
          title="Drop Project"
          size="medium"
          disabled={!isMatchProjectName}
        />
      </Box>
    </Stack>
  );
};

// Exporting the component as the default export
export default DeleteProject;
