import { FC } from "react";
import Box from "@mui/material/Box";
import { FormHelperText, Button, Grid, InputLabel } from "@mui/material";
import RhfCKEditorComponent from "../../ck-editor/CkEditorComponent";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";
import { useManageTask } from "./Helper";
import RhfSelectComponent from "../../common/textfield/select/RhfSelectComponent";
import dataServices from "../../../services/data-services/DataServices";
import { GetTaskByIdResponse } from "../../../services/project-services/Helper";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import RhfMultiUsersAutocomplete from "../../common/textfield/autocomplete/multi-autocomplete/RhfMultiUsersAutocomplete";

const ManageTaskForm: FC<{ values?: GetTaskByIdResponse["data"] }> = ({
  values,
}) => {
  const {
    control,
    setValue,
    isSubmitting,
    assigneesApiDetails,
    handleSubmit,
    onSubmit,
  } = useManageTask(values);

  return (
    <Box
      component="form"
      display="flex"
      p={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item md={10} xs={8} gap={2}>
          <FormHelperText sx={{ fontSize: 15 }}>Tracker *</FormHelperText>
          <RhfSelectComponent
            control={control}
            name="trackerId"
            size="small"
            required
            defaultValue={values?.tracker}
            apidetails={{ api: dataServices.getTrackers }}
          />
          <RhfCKEditorComponent
            control={control}
            label="Description"
            name="description"
            required
          />
        </Grid>
        <Grid item md={2} xs={4}>
          <InputLabel id="assignees-autocomplete">Assignees</InputLabel>
          <RhfMultiUsersAutocomplete
            useFormHooks={{ control: control, setValue: setValue }}
            label=""
            name="assignees"
            size="small"
            defaultValues={values?.assignees}
            apiDetails={assigneesApiDetails}
          />
        </Grid>
        <Grid item md={10} xs={12}>
          <Box display="flex" justifyContent="end" columnGap={1}>
            <Button
              variant="outlined"
              color="error"
              onClick={generalFunctions.goBack}
            >
              Close
            </Button>
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

export default ManageTaskForm;
