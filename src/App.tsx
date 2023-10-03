import { Routes, Route } from "react-router-dom";
import PageSignIn from "./pages/public/sign-in/PageSignIn";
import PageHome from "./pages/home/PageHome";
import PageSignUp from "./pages/public/sign-up/PageSignUp";
import PageProjects from "./pages/home/project/PageProjects";
import ModalContextProvider from "./utils/helpers/context/modal-context/ModalContextProvider";
import GeneralModal from "./components/modal/GeneralModal";

const App: React.FC = () => {
  return (
    <ModalContextProvider>
      <Routes>
        <Route index element={<PageSignIn />} />
        <Route path="/signup" element={<PageSignUp />} />
        <Route path="/home" element={<PageHome />}>
          <Route index element={<PageProjects />} />
        </Route>
      </Routes>
      <GeneralModal />
    </ModalContextProvider>
  );
};

export default App;
