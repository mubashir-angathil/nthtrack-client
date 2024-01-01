// Importing necessary dependencies and components
import { Button, Grid, Chip } from "@mui/material";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";
import RhfTextfieldComponent from "../../common/textfield/RhfTextFieldComponent";
import { ManageStatusFormProps, useManageStatus } from "./Helper";
import ColorSelector from "../../common/color-selector/ColorSelector";

// Component for managing status form
const ManageStatusForm: React.FC<ManageStatusFormProps> = ({ values }) => {
  // Destructuring values and functions from the custom hook
  const {
    control,
    watch,
    activeColor,
    setActiveColor,
    onSubmit,
    isSubmitting,
    handleModalClose,
    handleSubmit,
  } = useManageStatus({ values });

  // Rendering the status form
  return (
    <Grid
      container
      mt={1}
      gap={2}
      component="form"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Displaying the status chip with the selected color */}
      <Chip
        label={watch("name")}
        variant="outlined"
        sx={{
          backgroundColor: `rgba(${activeColor},0.3)`,
          borderColor: `rgba(${activeColor},1)`,
        }}
      />
      {/* Textfield component for entering the status name */}
      <RhfTextfieldComponent
        control={control}
        name="name"
        label="Label"
        sx={{ width: 250 }}
      />
      {/* Color selector for choosing the status color */}
      <ColorSelector activeColor={activeColor} onColorSelect={setActiveColor} />
      {/* Button section for closing and submitting the form */}
      <Grid item xs={12} display="flex" justifyContent="end" columnGap={1}>
        <Button variant="outlined" color="error" onClick={handleModalClose}>
          Close
        </Button>
        <SubmitButtonComponent
          title={values ? "Update Status" : "Create Status"}
          loading={isSubmitting}
        />
      </Grid>
    </Grid>
  );
};

// Exporting the component as the default export
export default ManageStatusForm;
