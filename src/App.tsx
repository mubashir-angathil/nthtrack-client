import { Routes, Route } from "react-router-dom";
import PageSignIn from "./pages/public/sign-in/PageSignIn";
import PageHome from "./pages/home/PageHome";
import PageSignUp from "./pages/public/sign-up/PageSignUp";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route index element={<PageSignIn />} />
        <Route path="/signup" element={<PageSignUp />} />
        <Route path="/home" element={<PageHome />}>
          <Route index element={<>Home</>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
