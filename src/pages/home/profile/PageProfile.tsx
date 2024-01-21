import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Edit, Email, Person, Save } from "@mui/icons-material";
import { useProfileManagement } from "./Helper";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";
import { profileStyle } from "./Style";

const PageProfile: React.FC = () => {
  const {
    profileDetails,
    form,
    error,
    handleChangeUserName,
    handleChange,
    handleSaveChanges,
    handleDeleteAccount,
  } = useProfileManagement();
  const theme = useTheme();
  const style = profileStyle;

  return (
    <Grid container gap={2} paddingInline={3}>
      <Grid item xs={12}>
        <Typography fontWeight={700} variant="h5" letterSpacing={2}>
          Profile
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        gap={3}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >
        <Avatar sx={style.avatarStyle} src={profileDetails?.picture}>
          {profileDetails.username.charAt(0)}
        </Avatar>
        <Box
          gap={1}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          {form.username === null ? (
            <Typography variant="h3" sx={style.usernameStyle} fontWeight={600}>
              {profileDetails.username}
            </Typography>
          ) : (
            <TextField
              onChange={handleChange}
              value={form.username}
              error={Boolean(error?.username)}
              helperText={error?.username}
              autoFocus
              inputProps={{ style: { textTransform: "capitalize" } }}
            />
          )}
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            flexWrap="wrap"
            sx={{
              columnGap: 2,
              [theme.breakpoints.down("sm")]: {
                columnGap: 1,
              },
            }}
          >
            <Typography
              variant="subtitle1"
              color="GrayText"
              sx={style.emailStyle}
            >
              <Email fontSize="small" />
              {profileDetails.email}
            </Typography>
            <Typography
              variant="caption"
              color="GrayText"
              sx={style.joinedAtStyle}
            >
              <Person fontSize="small" />
              {profileDetails.createdAt !== "" && (
                <>
                  Joined at {new Date(profileDetails.createdAt).toDateString()}
                </>
              )}
            </Typography>
          </Box>
          <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
            <Typography
              variant="subtitle2"
              sx={{
                ...style.staticsButtonStyle,
                maxWidth: 200,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.9)",
              }}
            >
              <Box component="span">
                {generalFunctions.formateNumber(profileDetails.totalProjects)}
              </Box>
              &nbsp;Projects
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                maxWidth: 260,
                ...style.staticsButtonStyle,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgba(255,255,255,0.2)"
                    : "rgba(0,0,0,0.9)",
              }}
            >
              {generalFunctions.formateNumber(
                profileDetails.totalContributedProjects,
              )}
              &nbsp; Contributed Projects
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        sx={{
          justifyContent: "end",
          [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
          },
        }}
      >
        {form.username !== null ? (
          <Button
            variant="outlined"
            size="medium"
            color="error"
            sx={{ mr: 1 }}
            onClick={handleChangeUserName}
          >
            Cancel
          </Button>
        ) : (
          <Button
            size="medium"
            variant="contained"
            onClick={handleChangeUserName}
            endIcon={<Edit />}
          >
            Change username
          </Button>
        )}
        {form.username !== null &&
          form.username !== profileDetails.username && (
            <Button
              size="medium"
              color="info"
              endIcon={<Save fontSize="small" />}
              variant="contained"
              onClick={handleSaveChanges}
            >
              Save
            </Button>
          )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Danger Zone</Typography>
        <Box sx={style.dangerZoneItem}>
          <Typography sx={{ whiteSpace: "pre-wrap" }}>
            Delete Account Permanently
          </Typography>
          <Button
            color="error"
            variant="outlined"
            onClick={handleDeleteAccount}
            sx={{
              minWidth: 200,
              display: "flex",
              [theme.breakpoints.down(550)]: {
                flex: 1,
              },
            }}
          >
            Delete Account
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PageProfile;
