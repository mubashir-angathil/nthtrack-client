import React from "react";
import { CardContent, Box } from "@mui/material";
import SignUpFormComponent from "../../../components/sign-up-form/SignUpFormComponent";
import { CustomCardComponent } from "../../../components/common/card/CustomCardComponent";
import { AuthCardHeaderComponent } from "../../../components/common/auth-card-header/AuthCardHeaderComponent";

export const PageSignUp: React.FC = () => {
  return (
    <CustomCardComponent>
      <Box textAlign="center" display="grid">
        <CardContent>
          <AuthCardHeaderComponent title="Sign up" />
        </CardContent>
        <SignUpFormComponent />
      </Box>
    </CustomCardComponent>
  );
};
export default PageSignUp;
