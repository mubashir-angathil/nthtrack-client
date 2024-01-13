/* eslint-disable no-unused-vars */
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItemButton,
  Tab,
  Typography,
} from "@mui/material";
import React from "react";
import { GetNotificationResponse } from "../../../../services/services/Helper";
import AvatarComponent from "../../avatar/AvatarComponent";
import { labelColors } from "../../../../utils/helpers/configs/Colors";
import { useManageNotifications } from "./Helper";
import generalFunctions from "../../../../utils/helpers/functions/GeneralFunctions";
import { useAuthContext } from "../../../../utils/helpers/context/auth-context/AuthContext";

const NotificationPanelComponent: React.FC<{
  refresh?: boolean;
  maxContainerHeight?: number | string;
  newNotificationsOnly?: boolean;
}> = ({ refresh, maxContainerHeight = 450, newNotificationsOnly }) => {
  const {
    notifications,
    tab,
    setTab,
    handleInvitation,
    handleNotificationLoad,
  } = useManageNotifications({ refresh, newNotificationsOnly });
  const {
    authDetails: { user },
  } = useAuthContext();
  const panels = [
    {
      value: "All",
      body: notifications?.map((notification, index) => (
        <Box key={notification.id} display="grid" gap={2}>
          {notification.type.toUpperCase() === "INVITE" ? (
            <InviteCardComponent
              index={index}
              notification={notification}
              handleInvitation={handleInvitation}
            />
          ) : (
            <GeneralNotificationCardComponent
              index={index}
              notification={notification}
              userId={user.id}
            />
          )}
        </Box>
      )),
    },
    {
      value: "Mentions",
      body: notifications?.map((notification, index) => (
        <GeneralNotificationCardComponent
          notification={notification}
          index={index}
          key={notification.id}
          userId={user.id}
        />
      )),
    },
    {
      value: "Invites",
      body: notifications?.map((notification, index) => (
        <InviteCardComponent
          key={notification.id}
          index={index}
          notification={notification}
          handleInvitation={handleInvitation}
        />
      )),
    },
  ];

  return (
    <TabContext value={tab}>
      <TabListComponent setTab={setTab} />
      {panels.map((panel) => (
        <TabPanel key={panel.value} value={panel.value} sx={{ p: 0 }}>
          <List
            component="div"
            onScroll={handleNotificationLoad}
            sx={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              overflowX: "hidden",
              gap: 2,
              p: 2,
              height: "auto",
              maxHeight: maxContainerHeight,
            }}
          >
            {panel.body}
          </List>
        </TabPanel>
      ))}
    </TabContext>
  );
};

const TabListComponent: React.FC<{
  setTab: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setTab }) => {
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };
  return (
    <TabList onChange={handleChange}>
      <Tab label="All" value="All" />
      <Tab label="Mentions" value="Mentions" />
      <Tab label="Invites" value="Invites" />
    </TabList>
  );
};

const InviteCardComponent: React.FC<{
  notification: GetNotificationResponse["data"][0];
  index: number;
  handleInvitation: ({
    type,
    projectId,
    notificationId,
  }: {
    type: "accept" | "reject";
    projectId: number | null;
    notificationId: number;
  }) => void;
}> = ({ notification, index, handleInvitation }) => {
  return (
    <>
      <ListItemButton
        sx={{
          display: "flex",
          alignItems: "start",
          flexDirection: "row",
          padding: 1,
          borderRadius: 5,
          cursor: "auto",
          color: notification.readersIds.length > 0 ? "grey" : "inherit",
        }}
        disableRipple
        disableTouchRipple
        className="appear"
      >
        <Grid>
          <AvatarComponent
            {...notification.author}
            profile
            height={36}
            width={36}
            color={`rgba(${Object.values(labelColors)[index]})`}
          />
        </Grid>
        <Grid flex={1} display="flex" paddingInline={1} flexDirection="column">
          <Grid display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" color="Highlight" fontWeight={600}>
              {notification.author.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {generalFunctions.formatNotificationTimestamp(
                notification.createdAt,
              )}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography fontSize="1rem" fontWeight={500}>
              {notification.content}
            </Typography>
          </Grid>
          <Grid display="flex" justifyContent="flex-end">
            <Button
              sx={{ mr: 1 }}
              disabled={notification.readersIds.length > 0}
              size="small"
              variant="contained"
              color="success"
              onClick={() => {
                handleInvitation({
                  type: "accept",
                  projectId: notification.projectId,
                  notificationId: notification.id,
                });
              }}
            >
              Accept
            </Button>
            <Button
              disabled={notification.readersIds.length > 0}
              variant="outlined"
              size="small"
              color="error"
              onClick={() => {
                handleInvitation({
                  type: "reject",
                  projectId: notification.projectId,
                  notificationId: notification.id,
                });
              }}
            >
              Decline
            </Button>
          </Grid>
        </Grid>
      </ListItemButton>
      <Divider />
    </>
  );
};

const GeneralNotificationCardComponent: React.FC<{
  notification: GetNotificationResponse["data"][0];
  index: number;
  userId: number | null;
}> = ({ index, notification, userId }) => {
  return (
    <>
      <ListItemButton
        sx={{
          display: "flex",
          alignItems: "start",
          flexDirection: "row",
          padding: 1,
          borderRadius: 5,
          cursor: "auto",
          color:
            userId && notification.readersIds.includes(userId)
              ? "grey"
              : "inherit",
        }}
        disableRipple
        disableTouchRipple
        className="appear"
      >
        <Grid>
          <AvatarComponent
            {...notification.author}
            profile
            height={36}
            width={36}
            color={`rgba(${Object.values(labelColors)[index]})`}
          />
        </Grid>
        <Grid flex={1} display="flex" paddingInline={1} flexDirection="column">
          <Grid display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" color="Highlight" fontWeight={600}>
              {notification.author.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {generalFunctions.formatNotificationTimestamp(
                notification.createdAt,
              )}
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", flexWrap: "wrap" }}>
            <Typography fontSize="1rem" fontWeight={500}>
              {notification.content}
            </Typography>
          </Grid>
        </Grid>
      </ListItemButton>
      <Divider />
    </>
  );
};
export default NotificationPanelComponent;
