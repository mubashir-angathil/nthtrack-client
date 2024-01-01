// Importing necessary dependencies and components
import React from "react";
import { Button, Chip, Grid, TextField } from "@mui/material";
import ColorSelector from "../../common/color-selector/ColorSelector";
import { ManageLabelFormInterface, useManageLabel } from "./Helper";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";

// Component for managing labels in a form
const ManageLabelForm: React.FC<ManageLabelFormInterface> = (props) => {
  // Destructuring values and functions from the custom hook
  const {
    handleSubmit,
    newLabel,
    fieldError,
    setNewLabel,
    handleChange,
    handleModalClose,
  } = useManageLabel(props);

  // Rendering the label management form
  return (
    <Grid
      container
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Section for displaying the current label */}
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Chip
          label={newLabel.name}
          variant="outlined"
          sx={{
            backgroundColor: `rgba(${newLabel.color},0.3)`,
            borderColor: `rgba(${newLabel.color},1)`,
          }}
        />
        {/* Input field for the new label */}
        <TextField
          id="name"
          name="name"
          autoFocus
          required
          margin="dense"
          value={newLabel.name}
          onChange={handleChange}
          label="New Label"
          type="text"
          size="small"
          variant="outlined"
          error={Boolean(fieldError?.message)}
          helperText={fieldError?.message}
        />
        {/* Color selector for choosing the label color */}
        <ColorSelector
          activeColor={newLabel.color}
          onColorSelect={(color: string) => {
            setNewLabel((preValues) => {
              const updatedValues = { ...preValues, color: color };
              return updatedValues;
            });
          }}
        />
      </Grid>

      {/* Button section for cancel and submit */}
      <Grid item display="flex" justifyContent="flex-end" xs={12} gap={2}>
        <Button onClick={handleModalClose} variant="outlined" color="error">
          Cancel
        </Button>
        <SubmitButtonComponent
          title={props.values ? "Update" : "Add"}
          size="small"
        />
      </Grid>
    </Grid>
  );
};

// Exporting the component as the default export
export default ManageLabelForm;
