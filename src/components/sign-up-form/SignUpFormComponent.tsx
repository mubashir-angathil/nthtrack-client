import React from "react";
import { Box, Button, FormControl, IconButton } from "@mui/material";
import SubmitButtonComponent from "../common/buttons/SubmitButtonComponent";
import { useSignUp } from "./Helper";
import RhfTextfieldComponent from "../common/textfield/RhfTextFieldComponent";
import GoogleSvg from "../../assets/google.svg";
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

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
  const {
    onSubmit,
    isVisiblePassword,
    setIsVisiblePassword,
    control,
    handleSubmit,
  } = useSignUp();

  return (
    <Box
      component="form"
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
          name="username"
          placeholder="User name"
          control={control}
          startAdornment={<Person fontSize="small" />}
        />
      </FormControl>
      {/* Username Input */}
      <FormControl fullWidth>
        <RhfTextfieldComponent
          required
          type="email"
          name="email"
          control={control}
          placeholder="Email"
          startAdornment={<Email fontSize="small" />}
        />
      </FormControl>

      {/* Password Input */}
      <FormControl fullWidth>
        <RhfTextfieldComponent
          required
          name="password"
          type={isVisiblePassword ? "text" : "password"}
          control={control}
          placeholder="Password"
          startAdornment={<Lock fontSize="small" />}
          endAdornment={
            <IconButton
              onClick={() => setIsVisiblePassword((prevValue) => !prevValue)}
            >
              {isVisiblePassword ? (
                <Visibility fontSize="small" />
              ) : (
                <VisibilityOff fontSize="small" />
              )}
            </IconButton>
          }
        />
      </FormControl>

      {/* Confirm Password Input */}
      <FormControl fullWidth>
        <RhfTextfieldComponent
          required
          size="small"
          type="password"
          control={control}
          placeholder="Confirm Password"
          name="confirmPassword"
          startAdornment={<Lock fontSize="small" />}
        />
      </FormControl>

      {/* Submit Button */}
      <SubmitButtonComponent
        title="Create New Account"
        sx={{ mt: 1, height: "40px", borderRadius: 5 }}
        // loading={isLoading}
      />
      <Button
        sx={{
          height: "40px",
          background: "white",
          color: "black",
          borderRadius: 5,
          boxShadow: 1,
        }}
        variant="outlined"
        startIcon={<img src={GoogleSvg} width={28} height={28} />}
      >
        Sign in with google
      </Button>
    </Box>
  );
};

export default SignUpFormComponent;
