import { Routes, Route } from "react-router-dom";
import PageSignIn from "./pages/public/sign-in/PageSignIn";
import PageHome from "./pages/home/PageHome";
import PageSignUp from "./pages/public/sign-up/PageSignUp";
import PageProjects from "./pages/home/project/PageProjects";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<PageSignIn />} />
        <Route path="/signup" element={<PageSignUp />} />
        <Route path="/home" element={<PageHome />}>
          <Route index element={<PageProjects />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
