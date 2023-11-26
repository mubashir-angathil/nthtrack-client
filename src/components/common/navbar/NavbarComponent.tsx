import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import navbarStyes from "./Style";
import cookieServices from "../../../services/storage-services/CookieServices";
import { useAuthContext } from "../../../utils/helpers/context/auth-context/AuthContext";
import { initialAuthDetailsState } from "../../../utils/helpers/context/auth-context/Helper";

export const NavbarComponent = () => {
  const styles = navbarStyes;
  const { authDetails, setAuthDetails } = useAuthContext();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  // Define function to handle menu opening
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // Define function to handle menu closing
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const settings = [
    {
      item: "Logout",
      action: () => {
        handleCloseUserMenu();

        cookieServices.clearAuthDetails();
        setAuthDetails(initialAuthDetailsState);
      },
    },
  ];

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense" sx={{ p: "0.2em" }}>
          <AdbIcon sx={{ display: "flex", mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={styles.logo}
          >
            BUGTRACK
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ width: 36, height: 36 }}>
                  {authDetails.user.username?.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem disabled sx={{ display: "grid" }}>
                <Typography>{authDetails.user.username}</Typography>
                <Typography>{authDetails.user.email}</Typography>
              </MenuItem>
              {settings.map((setting) => (
                <MenuItem key={setting.item} onClick={setting.action}>
                  <Typography textAlign="center">{setting.item}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
