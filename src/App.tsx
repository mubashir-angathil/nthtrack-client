import { Routes, Route } from "react-router-dom";
import DialogContextProvider from "./utils/helpers/context/dialog-context/DialogContextProvider";
import { theme } from "./utils/helpers/configs/Theme";
import routes from "./utils/helpers/routes/Routes";
import GeneralDialog from "./components/common/dialog/GeneralDialog";
import { CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import AuthContextProvider from "./utils/helpers/context/auth-context/AuthContextProvider";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { Close } from "@mui/icons-material";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <SnackbarProvider
          autoHideDuration={3000}
          maxSnack={3}
          action={(snackbarId) => (
            <>
              <IconButton onClick={() => closeSnackbar(snackbarId)}>
                <Close sx={{ color: "white" }} />
              </IconButton>
            </>
          )}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
        >
          <DialogContextProvider>
            <Routes>
              <Route index element={routes.signIn.element} />
              <Route
                path={routes.signUp.path}
                element={routes.signUp.element}
              />
              <Route path={routes.home.path} element={routes.home.default}>
                <Route index element={routes.home.element} />
                <Route path={routes.projects.path.concat(":id")}>
                  <Route index element={routes.projects.element} />
                  <Route
                    path={routes.tasks.path.concat(":id")}
                    element={routes.tasks.element}
                  />
                </Route>
              </Route>
            </Routes>
            <GeneralDialog />
          </DialogContextProvider>
        </SnackbarProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
