import { Notifications } from "@mui/icons-material";
import {
  Badge,
  Box,
  Divider,
  Menu,
  MenuItem,
  ToggleButton,
  Tooltip,
  Typography,
  colors,
} from "@mui/material";
import { useNotifications } from "./Helper";

export const NotificationComponent: React.FC = () => {
  const {
    handleNotificationLoading,
    notificationDetails,
    handleCloseNotifications,
    handleOpenNotifications,
    anchorElNotifications,
  } = useNotifications();
  return (
    <>
      <Tooltip title="Notifications">
        <ToggleButton
          sx={{ width: 24, height: 24, borderRadius: 2 }}
          value="notification"
          onChange={handleOpenNotifications}
        >
          <Badge
            badgeContent={notificationDetails.notificationCount}
            color="error"
          >
            <Notifications fontSize="small" />
          </Badge>
        </ToggleButton>
      </Tooltip>
      <Menu
        id="notification-menu"
        anchorEl={anchorElNotifications}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElNotifications)}
        onClose={handleCloseNotifications}
        slotProps={{
          paper: {
            style: {
              minWidth: 350,
              minHeight: 350,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            p: "5px 15px 5px 15px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1">Notifications</Typography>
        </Box>
        <Divider />
        <Box
          sx={{ height: 350, overflowY: "auto" }}
          onScroll={handleNotificationLoading}
        >
          {notificationDetails.notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              sx={{
                background: colors.green[400],
                m: "10px 10px",
                borderRadius: 2,
              }}
              disableRipple
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    overflowWrap: "break-word",
                  }}
                >
                  {notification.message}
                </Typography>
                <Typography variant="caption" textAlign="end">
                  {new Date(notification.createdAt).toLocaleString()}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
      </Menu>
    </>
  );
};
