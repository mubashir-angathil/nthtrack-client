import { Notifications } from "@mui/icons-material";
import {
  Badge,
  Box,
  Divider,
  Drawer,
  ToggleButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNotifications } from "./Helper";
import NotificationPanelComponent from "./notification-panels/NotificationPanelComponent";

export const NotificationComponent: React.FC = () => {
  const {
    handleCloseNotifications,
    handleOpenNotifications,
    anchorElNotifications,
    pushNotification,
  } = useNotifications();
  return (
    <>
      <Tooltip title="Notifications">
        <ToggleButton
          sx={{ width: 24, height: 24, borderRadius: 2 }}
          value="notification"
          onChange={handleOpenNotifications}
        >
          <Badge badgeContent={pushNotification.count} color="error">
            <Notifications fontSize="small" />
          </Badge>
        </ToggleButton>
      </Tooltip>

      <Drawer
        open={Boolean(anchorElNotifications)}
        anchor="right"
        onClose={handleCloseNotifications}
      >
        <Box width={450}>
          <Toolbar>
            <Typography variant="h5" fontWeight={600} letterSpacing={1}>
              Notifications
            </Typography>
          </Toolbar>
          <Divider />
          {Boolean(anchorElNotifications) && (
            <NotificationPanelComponent
              maxContainerHeight={"calc(100dvh - 120px)"}
              newNotificationsOnly
            />
          )}
        </Box>
      </Drawer>
    </>
  );
};
