import React from "react";
import { CardContent, Box } from "@mui/material";
import SignInFormComponent from "../../../components/sign-in-form/SignInFormComponent";
import { CustomCardComponent } from "../../../components/common/card/CustomCardComponent";
import { AuthCardHeaderComponent } from "../../../components/common/auth-card-header/AuthCardHeaderComponent";

export const PageSignIn: React.FC = () => {
  return (
    <CustomCardComponent>
      <Box textAlign="center" display="grid" p={0}>
        <CardContent>
          <AuthCardHeaderComponent title="Sign in" />
        </CardContent>
        <SignInFormComponent />
      </Box>
    </CustomCardComponent>
  );
};
export default PageSignIn;
