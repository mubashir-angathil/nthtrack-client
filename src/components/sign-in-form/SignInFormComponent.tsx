import React from "react";
import { Box, Button, FormControl, IconButton, useTheme } from "@mui/material";
import SubmitButtonComponent from "../common/buttons/SubmitButtonComponent";
import { useSignIn } from "./Helper";
import RhfTextfieldComponent from "../common/textfield/RhfTextFieldComponent";
import { Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleSvg from "../../assets/google.svg";
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
  } = useSignIn();
  const theme = useTheme();
  return (
    <Box
      component="form"
      width={"100%"}
      display="grid"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        "& .MuiOutlinedInput-root": {
          // background: colors.grey[700],
          height: "45px",
          borderRadius: 5,
          // color: "white",
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
      <Button
        sx={{
          height: "40px",
          background:
            theme.palette.mode === "light" ? "rgba(0,0,0,0.05)" : "white",
          color: "black",
          borderRadius: 5,
        }}
        variant="outlined"
        startIcon={<img src={GoogleSvg} width={28} height={28} />}
      >
        Sign in with google
      </Button>
    </Box>
  );
};

export default SignInFormComponent;
