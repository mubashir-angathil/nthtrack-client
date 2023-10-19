import { Routes, Route } from "react-router-dom";
import ModalContextProvider from "./utils/helpers/context/modal-context/ModalContextProvider";
import { ThemeProvider } from "@mui/system";
import { theme } from "./utils/helpers/configs/Theme";
import routes from "./utils/helpers/routes/Routes";
import GeneralModal from "./components/common/modal/GeneralModal";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ModalContextProvider>
        <Routes>
          <Route index element={routes.signIn.element} />
          <Route path={routes.signUp.path} element={routes.signUp.element} />
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
        <GeneralModal />
      </ModalContextProvider>
    </ThemeProvider>
  );
};

export default App;
