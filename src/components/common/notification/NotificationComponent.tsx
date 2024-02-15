import { Close, Notifications } from "@mui/icons-material";
import {
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  ToggleButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
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
  const theme = useTheme();

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
        <Box
          sx={{
            maxWidth: 500,
            minWidth: 450,
            [theme.breakpoints.down("md")]: {
              minWidth: 320,
            },
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" fontWeight={600} letterSpacing={1}>
              Notifications
            </Typography>
            <IconButton size="small" onClick={handleCloseNotifications}>
              <Close fontSize="small" />
            </IconButton>
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
