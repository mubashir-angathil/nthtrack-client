import React from "react";
import { Box, FormControl, TextField } from "@mui/material";
import SubmitButtonComponent from "../common/buttons/SubmitButtonComponent";
import { useSignUp } from "./Helper";

const SignUpFormComponent: React.FC = () => {
  const { handleSignUp } = useSignUp();
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignUp();
  };

  return (
    <Box
      component="form"
      p={2}
      display="grid"
      gap={2}
      onSubmit={handleFormSubmit}
    >
      <FormControl fullWidth>
        <TextField
          label="Username"
          placeholder="jhon@gmail.com"
          type="email"
          size="small"
          required
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          label="Password"
          placeholder="password"
          type="password"
          size="small"
          required
        />
      </FormControl>

      <FormControl fullWidth>
        <TextField
          label="Confirm Password"
          placeholder="password"
          type="password"
          size="small"
          required
        />
      </FormControl>
      <SubmitButtonComponent title="Create Account" sx={{ mt: 2 }} />
    </Box>
  );
};

export default SignUpFormComponent;
