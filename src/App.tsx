import { Routes, Route } from "react-router-dom";
import DialogContextProvider from "./utils/helpers/context/dialog-context/DialogContextProvider";
import { theme } from "./utils/helpers/configs/Theme";
import routes from "./utils/helpers/routes/Routes";
import GeneralDialog from "./components/common/dialog/GeneralDialog";
import { CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import AuthContextProvider from "./utils/helpers/context/auth-context/AuthContextProvider";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { Close } from "@mui/icons-material";
import { AlertContextProvider } from "./utils/helpers/context/alert-context/AlertContextProvider";
import AlertComponent from "./components/common/alert/AlertComponent";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <SnackbarProvider
          autoHideDuration={3000}
          maxSnack={3}
          action={(snackbarId) => (
            <IconButton size="small" onClick={() => closeSnackbar(snackbarId)}>
              <Close sx={{ color: "white" }} />
            </IconButton>
          )}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
        >
          <AlertContextProvider>
            <DialogContextProvider>
              <Routes>
                <Route index element={routes.signIn.element} />
                <Route
                  path={routes.signUp.path}
                  element={routes.signUp.element}
                />
                <Route path={routes.home.path} element={routes.home.default}>
                  <Route index element={routes.home.element} />
                  <Route
                    path={routes.projects.create?.path}
                    element={routes.projects.create?.element}
                  />
                  <Route path={routes.projects.path.concat(":projectId")}>
                    <Route index element={routes.projects.element} />
                    <Route
                      path={routes.projectMembers.path}
                      element={routes.projectMembers.element}
                    />
                    <Route
                      path={routes.projects.update?.path}
                      element={routes.projects.update?.element}
                    />
                    <Route path={routes.tasks.path}>
                      <Route path=":taskId">
                        <Route index element={routes.tasks.element} />
                        <Route
                          path={routes.tasks.update?.path}
                          element={routes.tasks.update?.element}
                        />
                      </Route>
                      <Route
                        path={routes.tasks.create?.path}
                        element={routes.tasks.create?.element}
                      />
                    </Route>
                  </Route>
                  <Route path={routes.team.path.concat(":team")}>
                    <Route index element={routes.team.element} />
                    <Route
                      path={routes.projects.create?.path}
                      element={routes.projects.create?.element}
                    />
                    <Route path={routes.projects.path.concat(":projectId")}>
                      <Route index element={routes.projects.element} />
                      <Route
                        path={routes.projectMembers.path}
                        element={routes.projectMembers.element}
                      />
                      <Route
                        path={routes.projects.update?.path}
                        element={routes.projects.update?.element}
                      />
                      <Route path={routes.tasks.path}>
                        <Route path=":taskId">
                          <Route index element={routes.tasks.element} />
                          <Route
                            path={routes.tasks.update?.path}
                            element={routes.tasks.update?.element}
                          />
                        </Route>
                        <Route
                          path={routes.tasks.create?.path}
                          element={routes.tasks.create?.element}
                        />
                      </Route>
                    </Route>
                  </Route>
                </Route>
                <Route path="*" element={<h1>Page Not Found</h1>} />
              </Routes>
              <AlertComponent />
              <GeneralDialog />
            </DialogContextProvider>
          </AlertContextProvider>
        </SnackbarProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
