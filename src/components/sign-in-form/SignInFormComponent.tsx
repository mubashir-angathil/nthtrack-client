import React from "react";
import { Box, FormControl, TextField } from "@mui/material";
import SubmitButtonComponent from "../buttons/SubmitButtonComponent";
import { useNavigate } from "react-router-dom";

const SignInFormComponent: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box component="form" p={2} display="grid" gap={2}>
      <FormControl fullWidth>
        <TextField
          label="Username"
          placeholder="jhon@gmail.com"
          type="email"
          size="small"
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          label="Password"
          placeholder="password"
          type="password"
          size="small"
        />
      </FormControl>

      <SubmitButtonComponent
        title="Sign in"
        sx={{ mt: 2 }}
        onClick={() => navigate("/home")}
      />
    </Box>
  );
};

export default SignInFormComponent;
