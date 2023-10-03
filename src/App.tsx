import { Routes, Route } from "react-router-dom";
import PageSignIn from "./pages/public/sign-in/PageSignIn";
import PageHome from "./pages/home/PageHome";
import PageSignUp from "./pages/public/sign-up/PageSignUp";
import PageProjects from "./pages/home/project/PageProjects";
import ModalContextProvider from "./utils/helpers/context/modal-context/ModalContextProvider";
import GeneralModal from "./components/modal/GeneralModal";
import { ThemeProvider } from "@mui/system";
import { theme } from "./utils/helpers/configs/Theme";
import PageViewProject from "./pages/home/project/view-project/PageViewProject";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ModalContextProvider>
        <Routes>
          <Route index element={<PageSignIn />} />
          <Route path="/signup" element={<PageSignUp />} />
          <Route path="/home" element={<PageHome />}>
            <Route index element={<PageProjects />} />
            <Route path="project/:id" element={<PageViewProject />} />
          </Route>
        </Routes>
        <GeneralModal />
      </ModalContextProvider>
    </ThemeProvider>
  );
};

export default App;
