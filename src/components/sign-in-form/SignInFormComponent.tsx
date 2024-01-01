import React from "react";
import { Box, FormControl } from "@mui/material";
import SubmitButtonComponent from "../common/buttons/SubmitButtonComponent";
import { useSignIn } from "./Helper";
import RhfTextfieldComponent from "../common/textfield/RhfTextFieldComponent";

/**
 * SignInFormComponent
 *
 * This component represents the sign-in form. It utilizes the useSignIn custom hook
 * for managing form state and handling submission logic. The form includes input fields
 * for username and password, along with a submit button.
 *
 * Components:
 * - RhfTextfieldComponent: A reusable component for rendering text input fields using
 *   React Hook Form.
 * - SubmitButtonComponent: A reusable button component for form submission.
 *
 * @returns {React.FC} SignInFormComponent
 */
const SignInFormComponent: React.FC = () => {
  // Destructure properties from the useSignIn hook
  const { isLoading, control, handleSubmit, onSubmit } = useSignIn();

  return (
    <Box
      component="form"
      p={1}
      display="grid"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Username Input */}
      <FormControl fullWidth>
        <RhfTextfieldComponent
          required
          type="text"
          name="usernameOrEmail"
          label="Username / Email"
          control={control}
          placeholder="John / john@gmail.com"
        />
      </FormControl>

      {/* Password Input */}
      <FormControl fullWidth>
        <RhfTextfieldComponent
          required
          name="password"
          type="password"
          label="Password"
          control={control}
          placeholder="password"
        />
      </FormControl>

      {/* Submit Button */}
      <SubmitButtonComponent
        title="Sign in"
        sx={{ mt: 2 }}
        loading={isLoading}
      />
    </Box>
  );
};

export default SignInFormComponent;
