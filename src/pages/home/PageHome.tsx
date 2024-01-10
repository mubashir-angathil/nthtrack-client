import React, { useEffect } from "react";
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
import { useAuthContext } from "../../utils/helpers/context/auth-context/AuthContext";
import { RefreshContextProvider } from "../../utils/helpers/context/refresh-context/RefreshContextProvider";
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
  useMediaQuery,
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
import { useProjects } from "./project/Helper";
import cookieServices from "../../services/storage-services/CookieServices";
import { initialAuthDetailsState } from "../../utils/helpers/context/auth-context/Helper";
import { useAlertContext } from "../../utils/helpers/context/alert-context/AlertContext";
import { useAlert } from "../../components/common/alert/Helper";
import { useDrawerContext } from "../../utils/helpers/context/drawer-context/DrawerContext";
import { TitleHelper } from "../../utils/helpers/constants/Constants";

const PageHome: React.FC = () => {
  const {
    authDetails: { auth, user },
    setAuthDetails,
  } = useAuthContext();
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const { teams } = useProjects();
  const { setAlert } = useAlertContext();
  const { handleCloseAlert } = useAlert();
  const handleLogout = () => {
    setAlert({
      open: true,
      alert: {
        title: "Logout",
        message: "Are you sure? do you want to sign out?",
        positiveButton: "Sign out",
        negativeButton: "Cancel",
        response: (response) => {
          handleCloseAlert();
          if (response === "accept") {
            cookieServices.clearAuthDetails();
            setAuthDetails(initialAuthDetailsState);
          }
        },
      },
    });
  };
  const { drawer, setDrawer } = useDrawerContext();
  const matches = useMediaQuery("(min-width:960px)");

  // Effect to automatically close the default drawer when the screen width is below 960px
  useEffect(() => {
    if (drawer.open && !matches) {
      setDrawer((prevDrawer) => {
        return { open: !prevDrawer.open };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  return (
    <>
      {auth ? (
        <>
          <RefreshContextProvider>
            <NavbarComponent />
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
                onClick={() =>
                  setDrawer((prevState) => {
                    return { open: !prevState.open };
                  })
                }
              >
                {drawer.open ? (
                  <ArrowLeftRounded fontSize="large" />
                ) : (
                  <ArrowRightRounded fontSize="large" />
                )}
              </IconButton>
            </Tooltip>
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
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      setDrawer((prevState) => {
                        return { open: !prevState.open };
                      })
                    }
                  >
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
              <ListSubheader sx={{ lineHeight: 1.5 }}>
                Organizations
              </ListSubheader>
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

                  <Typography
                    variant="caption"
                    overflow="hidden"
                    color="GrayText"
                  >
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
          </RefreshContextProvider>
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
