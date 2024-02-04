import { Routes, Route } from "react-router-dom";
import DialogContextProvider from "./utils/helpers/context/dialog-context/DialogContextProvider";
import routes from "./utils/helpers/routes/Routes";
import GeneralDialog from "./components/common/dialog/GeneralDialog";
import { CssBaseline, IconButton, ThemeProvider } from "@mui/material";
import AuthContextProvider from "./utils/helpers/context/auth-context/AuthContextProvider";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { Close } from "@mui/icons-material";
import { AlertContextProvider } from "./utils/helpers/context/alert-context/AlertContextProvider";
import AlertComponent from "./components/common/alert/AlertComponent";
import { ProjectContextProvider } from "./utils/helpers/context/project-context/ProjectContextProvider";
import ModalContextProvider from "./utils/helpers/context/modal-context/ModalContextProvider";
import GeneralModal from "./components/common/modal/GeneralModal";
import { useThemeContext } from "./utils/helpers/context/theme-context/ThemeContext";
import { DrawerContextProvider } from "./utils/helpers/context/drawer-context/DrawerContextProvider";
import { PushNotificationContextProvider } from "./utils/helpers/context/push-notification-context/PushNotificationContextProvider";
import { UserPermissionProvider } from "./utils/helpers/context/user-permission-context/UserPermissionContextProvider";
import { RefreshContextProvider } from "./utils/helpers/context/refresh-context/RefreshContextProvider";
import { ComponentPermissionContextProvider } from "./utils/helpers/context/component-permission-context/ComponentPermissionContextProvider";
import { TitleHelper } from "./utils/helpers/constants/Constants";

const App: React.FC = () => {
  const { theme } = useThemeContext();
  document.title = TitleHelper.appName;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthContextProvider>
        <SnackbarProvider
          autoHideDuration={3000}
          maxSnack={3}
          action={(snackbarId) => (
            <IconButton size="small" onClick={() => closeSnackbar(snackbarId)}>
              <Close fontSize="small" sx={{ color: "white" }} />
            </IconButton>
          )}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
        >
          <RefreshContextProvider>
            <PushNotificationContextProvider>
              <ProjectContextProvider>
                <ComponentPermissionContextProvider>
                  <UserPermissionProvider>
                    <AlertContextProvider>
                      <ModalContextProvider>
                        <DialogContextProvider>
                          <DrawerContextProvider>
                            <Routes>
                              <Route
                                index
                                element={routes.authentication.element}
                              />
                              <Route
                                path={routes.home.path}
                                element={routes.home.default}
                              >
                                <Route index element={routes.home.element} />
                                <Route
                                  path={routes.profile.path}
                                  element={routes.profile.element}
                                />
                                <Route
                                  path={routes.notification.path}
                                  element={routes.notification.element}
                                />
                                <Route
                                  path={routes.projects.create?.path}
                                  element={routes.projects.create?.element}
                                />
                                <Route
                                  path={routes.projects.path.concat(
                                    ":projectId",
                                  )}
                                >
                                  <Route
                                    index
                                    element={routes.projects.element}
                                  />
                                  <Route
                                    path={routes.projectSettings.path}
                                    element={routes.projectSettings.element}
                                  />
                                  <Route
                                    path={routes.projects.update?.path}
                                    element={routes.projects.update?.element}
                                  />
                                  <Route path={routes.tasks.path}>
                                    <Route path=":taskId">
                                      <Route
                                        index
                                        element={routes.tasks.element}
                                      />
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
                                  <Route
                                    path={routes.projects.path.concat(
                                      ":projectId",
                                    )}
                                  >
                                    <Route
                                      index
                                      element={routes.projects.element}
                                    />
                                    <Route
                                      path={routes.projectSettings.path}
                                      element={routes.projectSettings.element}
                                    />
                                    <Route
                                      path={routes.projects.update?.path}
                                      element={routes.projects.update?.element}
                                    />
                                    <Route path={routes.tasks.path}>
                                      <Route path=":taskId">
                                        <Route
                                          index
                                          element={routes.tasks.element}
                                        />
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
                              <Route
                                path="*"
                                element={<h1>Page Not Found</h1>}
                              />
                            </Routes>
                            <AlertComponent />
                            <GeneralDialog />
                            <GeneralModal />
                          </DrawerContextProvider>
                        </DialogContextProvider>
                      </ModalContextProvider>
                    </AlertContextProvider>
                  </UserPermissionProvider>
                </ComponentPermissionContextProvider>
              </ProjectContextProvider>
            </PushNotificationContextProvider>
          </RefreshContextProvider>
        </SnackbarProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
};

export default App;
