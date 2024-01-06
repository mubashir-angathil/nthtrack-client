// PageAuthentication.tsx

// Import necessary modules and components
import React, { Suspense, lazy, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import SignInFormComponent from "../../../components/sign-in-form/SignInFormComponent";
import launchSvg from "../../../assets/launch.svg";
import worldConnectedSvg from "../../../assets/connectedWorld.svg";
const SignUpFormComponent = lazy(
  () => import("../../../components/sign-up-form/SignUpFormComponent"),
);
import ThemeToggleButtonComponent from "../../../components/common/buttons/toggle-button/ThemeToggleButtonComponent";
import { useAuthenticationStyle } from "./Helper";

const signInCaption = `Explore the efficiency of project and task management with our
user-friendly web application. Streamline your projects, track tasks
effortlessly, and elevate your productivity. Join now and witness
the simplicity of organized success`;

const signUpCaption = `Sign in to our web application and take control of your projects and tasks with ease.
Streamline collaboration, stay organized, and achieve your goals effortlessly.`;

// Define the PageAuthentication component
export const PageAuthentication: React.FC = () => {
  // State to track whether it's sign in or sign up page
  const [signInPage, setSignInPage] = useState<boolean>(true);

  // Function to handle sign up and sign in toggle
  const handleChangeSignup = () => {
    setSignInPage((prevValue) => !prevValue);
  };

  // Custom styles for the component based on the current page
  const style = useAuthenticationStyle(signInPage);

  return (
    // Main container using MUI Grid with custom styles
    <Grid container sx={style.containerStyles}>
      {/* Theme toggle button component */}
      <ThemeToggleButtonComponent />

      {/* Container for background section with specific styles */}
      <Grid item sx={style.backgroundStyles}>
        {/* Inner grid for information section */}
        <Grid sx={style.infoStyles}>
          {/* Box containing title, subtitle, and toggle button */}
          <Box>
            <Typography variant="h5" fontWeight={500}>
              {/* Displaying different titles based on sign in or sign up page */}
              {signInPage ? "New Here ?" : "On of Us ?"}
            </Typography>
            <Typography variant="subtitle1" color="GrayText" sx={style.caption}>
              {/* Displaying different subtitles based on sign in or sign up page */}
              {signInPage ? signInCaption : signUpCaption}
            </Typography>
            {/* Button to toggle between sign up and sign in */}
            <Button
              sx={style.buttonStyles}
              color="inherit"
              variant="outlined"
              onClick={handleChangeSignup}
            >
              {signInPage ? "Sign Up" : "Sign In"}
            </Button>
          </Box>

          {/* Displaying an image based on sign in or sign up page */}
          {launchSvg && worldConnectedSvg ? (
            <Box
              component="img"
              src={signInPage ? launchSvg : worldConnectedSvg}
              sx={style.imageStyles}
              loading="lazy"
              alt="Thumbnail"
            />
          ) : (
            <Box sx={style.imageStyles} />
          )}
        </Grid>
      </Grid>

      {/* Container for the form section with specific styles */}
      <Grid item sx={style.formConfinerWrapper}>
        {/* Inner box containing the form */}
        <Box sx={style.formContainer}>
          {/* Title for the form section */}
          <Typography variant="h4" fontWeight={600} mb={2}>
            {signInPage ? "Sign In" : "Sign Up"}
          </Typography>
          {/* Render sign in form or lazy-loaded sign up form based on the current page */}
          {signInPage ? (
            <SignInFormComponent />
          ) : (
            <Suspense fallback={<>...Loading</>}>
              <SignUpFormComponent />
            </Suspense>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

// Export the component
export default PageAuthentication;
