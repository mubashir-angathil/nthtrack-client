// Importing necessary dependencies and components
import { FC } from "react";
import Box from "@mui/material/Box";
import { FormHelperText, Button, Grid, InputLabel } from "@mui/material";
import RhfCKEditorComponent from "../../ck-editor/CkEditorComponent";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";
import { ManageTaskFormProps, useManageTask } from "./Helper";
import RhfMultiUsersAutocomplete from "../../common/textfield/autocomplete/multi-autocomplete/RhfMultiUsersAutocomplete";
import RhfTextfieldComponent from "../../common/textfield/RhfTextFieldComponent";
import RhfLabelAutocomplete from "../../common/textfield/autocomplete/label-autocomplete/RhfLabelAutocomplete";
import { useComponentPermissionContext } from "../../../utils/helpers/context/component-permission-context/ComponentPermissionContext";

// Functional component for managing task form
const ManageTaskForm: FC<ManageTaskFormProps> = ({
  values,
  activeStatus,
  setTasks,
  setRefresh,
}) => {
  // Destructuring values and functions from the custom hook
  const {
    control,
    setValue,
    handleDialogClose,
    isSubmitting,
    assigneesApiDetails,
    handleSubmit,
    onSubmit,
  } = useManageTask({ values, activeStatus, setTasks, setRefresh });
  const { componentPermission } = useComponentPermissionContext();

  // Extracting updateLabel permission status from componentPermission
  const updateLabelPermission = componentPermission["updateLabel"]?.permitted;

  // Extracting createLabel permission status from componentPermission
  const createLabelPermission = componentPermission["addNewLabel"]?.permitted;

  // Determine the visibility of the label field based on permissions and values
  // If values exist, use updateLabelPermission; otherwise, use createLabelPermission
  const isVisibleLabelField = values
    ? updateLabelPermission
    : createLabelPermission;

  // Rendering the task form
  return (
    <Box
      component="form"
      display="flex"
      paddingInline={{ md: 1, xs: 0 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} gap={2}>
          {/* Form helper text for label */}
          {isVisibleLabelField && (
            <>
              <FormHelperText sx={{ fontSize: 15 }}>Label *</FormHelperText>
              {/* Label autocomplete component */}
              <RhfLabelAutocomplete
                control={control}
                name="labelId"
                size="small"
                required
                defaultValue={values?.label}
                label=""
              />
            </>
          )}
          {/* Form helper text for task */}
          <FormHelperText sx={{ fontSize: 15 }}>Task *</FormHelperText>
          {/* Textfield component for entering task */}
          <RhfTextfieldComponent control={control} name="task" />
          {/* CKEditor component for entering task description */}
          <RhfCKEditorComponent
            control={control}
            label="Description"
            name="description"
            height="150px"
          />
          {/* Input label for assignees */}
          <InputLabel id="assignees-autocomplete">Assignees</InputLabel>
          {/* Multi-users autocomplete component */}
          <RhfMultiUsersAutocomplete
            useFormHooks={{ control: control, setValue: setValue }}
            label=""
            name="assignees"
            size="small"
            defaultValues={values?.assignees}
            apiDetails={assigneesApiDetails}
          />
        </Grid>
        <Grid item xs={12}>
          {/* Box for displaying buttons with close and submit actions */}
          <Box display="flex" justifyContent="end" columnGap={1}>
            {/* Button for closing the dialog */}
            <Button
              variant="outlined"
              color="error"
              onClick={handleDialogClose}
            >
              Close
            </Button>
            {/* Submit button component */}
            <SubmitButtonComponent
              title={values ? "Update Task" : "Create Task"}
              loading={isSubmitting}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Exporting the component as the default export
export default ManageTaskForm;
