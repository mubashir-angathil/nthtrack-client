// Importing necessary dependencies and components
import React from "react";
import { Box, Button, FormHelperText, Stack, TextField } from "@mui/material";
import { useDeleteAccount } from "./Helper";
import SubmitButtonComponent from "../../common/buttons/SubmitButtonComponent";

// Component for delete the account permanently
const DeleteAccount: React.FC = () => {
  // Destructuring values and functions from the custom hook
  const {
    email,
    handleChange,
    handleSubmit,
    handleDialogClose,
    isMatchAccountName,
  } = useDeleteAccount();

  // Rendering the delete account form
  return (
    <Stack gap={2} width={350} component="form" onSubmit={handleSubmit}>
      <FormHelperText sx={{ userSelect: "none", fontSize: 15.2 }}>
        To deactivate your account, please confirm your decision by entering the
        email associated with your account: "{email}".
      </FormHelperText>
      <TextField
        size="small"
        type="email"
        label="Email"
        fullWidth
        onChange={(e) => handleChange(e)}
      />
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
        {/* Submit button component with dynamic disabling based on account name match */}
        <SubmitButtonComponent
          title="Delete Account"
          size="medium"
          disabled={!isMatchAccountName}
        />
      </Box>
    </Stack>
  );
};

// Exporting the component as the default export
export default DeleteAccount;
