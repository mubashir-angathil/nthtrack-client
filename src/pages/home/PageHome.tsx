import React from "react";
import { NavbarComponent } from "../../components/common/navbar/NavbarComponent";
import {
  Outlet,
  Navigate,
  Location,
  useLocation,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import routes from "../../utils/helpers/routes/Routes";
import { OutletContainer } from "../../components/common/container/OutletContainer";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  ArrowLeftRounded,
  ArrowRightRounded,
  CloseOutlined,
  Logout,
  Notifications,
  Person,
  Source,
} from "@mui/icons-material";
import { labelColors } from "../../utils/helpers/configs/Colors";
import { TitleHelper } from "../../utils/helpers/constants/Constants";
import { useHome } from "./Helper";

const PageHome: React.FC = () => {
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const {
    matches,
    auth,
    user,
    teams,
    drawer,
    handleLogout,
    toggleDrawerState,
  } = useHome();
  const DrawerComponent = () => (
    <Drawer
      open={drawer.open}
      variant={!matches ? "temporary" : "persistent"}
      PaperProps={{
        style: {
          paddingTop: !matches ? 0 : 45,
          border: 0,
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: !matches ? "flex" : "none",
          p: 1,
          justifyContent: "space-between",
          paddingInline: 1.5,
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle1" fontWeight={700}>
          {TitleHelper.appName}
        </Typography>
        <Tooltip
          title={drawer.open ? "Close Drawer" : "Open Drawer"}
          disableInteractive
          arrow
          placement="right"
        >
          <IconButton size="small" color="error" onClick={toggleDrawerState}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <List>
        <ListSubheader sx={{ lineHeight: 2.2 }}>Home</ListSubheader>
        <ListItemButton
          sx={{ borderRadius: 8, m: 1 }}
          selected={location.pathname === routes.home.path}
          onClick={() => navigate(routes.home.path)}
        >
          <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
            <Source fontSize="small" />
          </Box>
          Projects
        </ListItemButton>
      </List>

      <ListSubheader sx={{ lineHeight: 2.2 }}>Account</ListSubheader>
      <List>
        {[
          {
            icons: <Person fontSize="small" />,
            item: "Profile",
            path: routes.profile.path,
          },
          {
            icons: <Notifications fontSize="small" />,
            item: "Notifications",
            path: routes.notification.path,
          },
        ].map((item) => (
          <ListItemButton
            key={item.item}
            sx={{ borderRadius: 8, m: 1 }}
            onClick={() => navigate(item.path)}
            selected={item.path === location.pathname.split("/")[2]}
          >
            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
              {item.icons}
            </Box>
            {item.item}
          </ListItemButton>
        ))}
      </List>
      <Box flex={1}>
        {teams?.length > 0 && (
          <>
            <ListSubheader sx={{ lineHeight: 1.5 }}>Teams</ListSubheader>
            <List
              sx={{
                width: 230,
                flex: 1,
                overflowY: "auto",
              }}
            >
              {teams.map((item, index) => (
                <ListItemButton
                  key={item.id}
                  sx={{ borderRadius: 8, m: 1 }}
                  onClick={() => {
                    navigate(routes.team.path.concat(item.team), {
                      state: { team: item },
                    });
                  }}
                >
                  <Box mr={2}>
                    <Avatar
                      alt={item.team}
                      sx={{
                        height: 28,
                        width: 28,
                        background: Object.entries(labelColors).at(index),
                        color: "inherit",
                      }}
                    >
                      {item.team.charAt(0)}
                    </Avatar>
                  </Box>
                  <Tooltip
                    title={item.team}
                    arrow
                    disableInteractive
                    placement="right"
                  >
                    <Typography
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      variant="body2"
                    >
                      {item.team}
                    </Typography>
                  </Tooltip>
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Box>
      <Box
        display="flex"
        gap={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: 230,
          pt: 1,
          pb: 1,
          bottom: 0,
          paddingInline: 2,
          borderTop: 1,
        }}
      >
        <Avatar
          sx={{
            width: 28,
            height: 28,
            background: `rgb(${labelColors.yellow})`,
            color: "inherit",
          }}
          src={user?.picture}
        >
          {user.username?.charAt(0)}
        </Avatar>
        <Box
          display="flex"
          justifyContent="center"
          flexDirection="column"
          width={120}
          pt={0.5}
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          <Typography
            variant="subtitle2"
            lineHeight={1}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {user.username}
          </Typography>

          <Typography variant="caption" overflow="hidden" color="GrayText">
            {user.email}
          </Typography>
        </Box>
        <Tooltip title="Logout" arrow placement="right">
          <IconButton
            size="small"
            color="error"
            onClick={handleLogout}
            sx={{ border: 1 }}
          >
            <Logout fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Drawer>
  );

  return (
    <>
      {auth ? (
        <>
          <NavbarComponent />

          {/* Drawer toggle button */}
          <Tooltip
            title={drawer.open ? "Close Drawer" : "Open Drawer"}
            disableInteractive
            arrow
            placement="right"
          >
            <IconButton
              sx={{
                position: "absolute",
                bottom: "50%",
                left: drawer.open ? 215 : 5,
                zIndex: 2,
                width: 24,
                height: 24,
                background: "white",
                color: "black",
                display: !matches ? "none" : "flex",
              }}
              size="small"
              onClick={toggleDrawerState}
            >
              {drawer.open ? (
                <ArrowLeftRounded fontSize="large" />
              ) : (
                <ArrowRightRounded fontSize="large" />
              )}
            </IconButton>
          </Tooltip>

          {/* Drawer component */}
          <DrawerComponent />

          {/* General Outlet */}
          <OutletContainer
            sx={{
              height: "100dvh",
              width: drawer.open && matches ? "calc(100vw - 230px)" : "100vw",
              ml: drawer.open && matches ? "230px" : "none",
              overflow: "auto",
            }}
          >
            <Outlet />
          </OutletContainer>
        </>
      ) : (
        <Navigate
          to={routes.authentication.path}
          state={{ from: location }}
          replace
        />
      )}
    </>
  );
};

export default PageHome;
