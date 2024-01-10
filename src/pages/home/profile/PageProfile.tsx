import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { labelColors } from "../../../utils/helpers/configs/Colors";
import { Email, Person, Save } from "@mui/icons-material";
import { useProfileManagement } from "./Helper";
import generalFunctions from "../../../utils/helpers/functions/GeneralFunctions";

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
  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={3}
      paddingInline={5}
    >
      <Grid item xs={12}>
        <Typography fontWeight={700} variant="h5">
          Profile
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Grid display="flex" alignItems="center" gap={5}>
          <Avatar
            sx={{
              width: 200,
              height: 200,
              border: 3,
              borderColor: "inherit",
              fontSize: 80,
              color: "inherit",
              background: `rgb(${labelColors.yellow})`,
            }}
          >
            {profileDetails.username.charAt(0)}
          </Avatar>
          <Grid
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
          >
            {form.username === null ? (
              <Typography
                variant="h3"
                sx={{
                  borderRadius: 10,
                  display: "flex",
                  justifyContent: "center",
                }}
                fontWeight={600}
              >
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

            <Typography
              variant="subtitle1"
              color="GrayText"
              sx={{
                borderRadius: 10,
                pb: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Email fontSize="small" />
              {profileDetails.email}
            </Typography>
            <Typography
              variant="caption"
              color="GrayText"
              sx={{
                borderRadius: 10,
                pb: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Person fontSize="small" />
              {profileDetails.createdAt !== "" && (
                <>
                  Joined at {new Date(profileDetails.createdAt).toDateString()}
                </>
              )}
            </Typography>
            <Grid
              item
              xs={12}
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="start"
            >
              <Typography
                variant="subtitle2"
                sx={{
                  border: 1,
                  borderRadius: 8,
                  p: 0.5,
                  paddingInline: 2,
                }}
              >
                {generalFunctions.formateNumber(profileDetails.totalProjects)}
                &nbsp;Projects
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  border: 1,
                  borderRadius: 8,
                  p: 0.5,
                  paddingInline: 2,
                }}
              >
                {generalFunctions.formateNumber(
                  profileDetails.totalContributedProjects,
                )}
                &nbsp; Contributed Projects
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
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
              color="info"
              // endIcon={<Edit fontSize="small" />}
              variant="contained"
              onClick={handleChangeUserName}
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
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Danger Zone</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            border: 1,
            mt: 1,
            borderColor: "red",
            borderRadius: 5,
            p: 3,
          }}
        >
          <Typography>Delete Account Permanently</Typography>
          <Button
            color="error"
            variant="outlined"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PageProfile;
