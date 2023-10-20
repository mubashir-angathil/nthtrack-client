import React from "react";
import { Box, FormControl } from "@mui/material";
import SubmitButtonComponent from "../common/buttons/SubmitButtonComponent";
import { useSignUp } from "./Helper";
import RhfTextfieldComponent from "../common/textfield/RhfTextFieldComponent";

/**
 * SignUpFormComponent
 *
 * This component represents the sign-up form. It utilizes the useSignUp custom hook
 * for managing form state and handling submission logic. The form includes input fields
 * for username, password, and confirm password, along with a submit button.
 *
 * Components:
 * - RhfTextfieldComponent: A reusable component for rendering text input fields using
 *   React Hook Form.
 * - SubmitButtonComponent: A reusable button component for form submission.
 *
 * @returns {React.FC} SignUpFormComponent
 */
const SignUpFormComponent: React.FC = () => {
  // Destructure properties from the useSignUp hook
  const { onSubmit, control, handleSubmit } = useSignUp();

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
          type="email"
          name="username"
          label="Username"
          control={control}
          placeholder="jhon@gmail.com"
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

      {/* Confirm Password Input */}
      <FormControl fullWidth>
        <RhfTextfieldComponent
          required
          size="small"
          type="password"
          control={control}
          placeholder="password"
          name="confirmPassword"
          label="Confirm Password"
        />
      </FormControl>

      {/* Submit Button */}
      <SubmitButtonComponent title="Create Account" sx={{ mt: 2 }} />
    </Box>
  );
};

export default SignUpFormComponent;
