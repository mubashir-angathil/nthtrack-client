import React from "react";
import { Box, FormControl, IconButton } from "@mui/material";
import SubmitButtonComponent from "../common/buttons/SubmitButtonComponent";
import { useSignIn } from "./Helper";
import RhfTextfieldComponent from "../common/textfield/RhfTextFieldComponent";
import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleAuthButtonComponent from "../common/buttons/GoogleAuthButtonComponent";
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
  const {
    isLoading,
    control,
    isVisible,
    setIsVisible,
    handleSubmit,
    onSubmit,
    doGoogleSignIn,
  } = useSignIn();
  return (
    <Box
      component="form"
      width={"100%"}
      display="grid"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "45px",
          borderRadius: 5,
        },
      }}
    >
      {/* Username Input */}
      <FormControl fullWidth>
        <RhfTextfieldComponent
          required
          type="text"
          name="usernameOrEmail"
          control={control}
          placeholder="Username / Email"
          startAdornment={<Person fontSize="small" />}
        />
      </FormControl>

      {/* Password Input */}
      <FormControl fullWidth>
        <RhfTextfieldComponent
          required
          name="password"
          type={isVisible ? "text" : "password"}
          control={control}
          placeholder="Password"
          startAdornment={<Lock fontSize="small" />}
          endAdornment={
            <IconButton
              size="small"
              title={isVisible ? "Invisible" : "Visible"}
              onClick={() => setIsVisible((prevValue) => !prevValue)}
            >
              {isVisible ? (
                <Visibility fontSize="small" />
              ) : (
                <VisibilityOff fontSize="small" />
              )}
            </IconButton>
          }
        />
      </FormControl>

      {/* Submit Button */}
      <SubmitButtonComponent
        title="Sign in"
        sx={{ mt: 1, height: "40px", borderRadius: 5, boxShadow: 0 }}
        loading={isLoading}
      />
      <GoogleAuthButtonComponent onClick={() => doGoogleSignIn()}>
        Google sign in
      </GoogleAuthButtonComponent>
    </Box>
  );
};

export default SignInFormComponent;
