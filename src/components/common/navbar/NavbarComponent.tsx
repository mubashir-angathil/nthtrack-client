import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import navbarStyes from "./Style";
import { useAuthContext } from "../../../utils/helpers/context/auth-context/AuthContext";
import { TitleHelper } from "../../../utils/helpers/constants/Constants";
import { NotificationComponent } from "../notification/NotificationComponent";
import {
  Button,
  IconButton,
  ToggleButton,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { NavigateFunction, useNavigate } from "react-router-dom";
import {
  DarkMode,
  Diversity2,
  LightMode,
  Menu,
  Refresh,
} from "@mui/icons-material";
import { useRefreshContext } from "../../../utils/helpers/context/refresh-context/RefreshContext";
import { labelColors } from "../../../utils/helpers/configs/Colors";
import { useThemeContext } from "../../../utils/helpers/context/theme-context/ThemeContext";
import { darkTheme, lightTheme } from "../../../utils/helpers/configs/Theme";
import { useDrawerContext } from "../../../utils/helpers/context/drawer-context/DrawerContext";
export const NavbarComponent = () => {
  const styles = navbarStyes;
  const navigate: NavigateFunction = useNavigate();
  const { authDetails } = useAuthContext();
  const { theme, setTheme } = useThemeContext();
  const { refresh, setRefresh } = useRefreshContext();
  const { setDrawer } = useDrawerContext();
  const darkMode = theme.palette.mode === "dark";
  const matches = useMediaQuery("(min-width:960px)");

  return (
    <AppBar position="fixed" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense" sx={{ p: "0.2em" }}>
          <IconButton
            size="small"
            sx={{ display: !matches ? "flex" : "none" }}
            onClick={() =>
              setDrawer((prevState) => {
                return { open: !prevState.open };
              })
            }
          >
            <Menu fontSize="small" />
          </IconButton>
          <Diversity2 sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={styles.logo}
          >
            {TitleHelper.appName}
          </Typography>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              columnGap: 2,
            }}
          >
            <NotificationComponent />
            <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
              <ToggleButton
                value="theme"
                onChange={() => {
                  setTheme(darkMode ? lightTheme : darkTheme);
                }}
                sx={{ width: 24, height: 24, borderRadius: 2 }}
                size="small"
              >
                {darkMode ? (
                  <LightMode fontSize="small" color="warning" />
                ) : (
                  <DarkMode fontSize="small" />
                )}
              </ToggleButton>
            </Tooltip>
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="center"
            >
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  background: `rgb(${labelColors.yellow})`,
                  color: "inherit",
                }}
              >
                {authDetails.user.username?.charAt(0)}
              </Avatar>
              <Box display={{ md: "flex", xs: "none" }} flexDirection="column">
                <Typography variant="subtitle2" lineHeight={1}>
                  {authDetails.user.username}
                </Typography>

                <Typography variant="caption" lineHeight={1} color="GrayText">
                  {authDetails.user.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
        {refresh.reload && (
          <Button
            sx={{
              position: "absolute",
              top: 50,
              width: 100,
              right: "50%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            size="small"
            onClick={() => {
              navigate(0);
              setRefresh({ reload: false });
            }}
            endIcon={<Refresh />}
          >
            Refresh
          </Button>
        )}
      </Container>
    </AppBar>
  );
};
