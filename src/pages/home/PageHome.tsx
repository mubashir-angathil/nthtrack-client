import React from "react";
import { NavbarComponent } from "../../components/common/navbar/NavbarComponent";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import routes from "../../utils/helpers/routes/Routes";
import { OutletContainer } from "../../components/common/container/OutletContainer";
import { useAuthContext } from "../../utils/helpers/context/auth-context/AuthContext";
import { RefreshContextProvider } from "../../utils/helpers/context/refresh-context/RefreshContextProvider";

const PageHome: React.FC = () => {
  const {
    authDetails: { auth },
  } = useAuthContext();
  const location = useLocation();

  return (
    <>
      {auth ? (
        <>
          <RefreshContextProvider>
            <NavbarComponent />
          </RefreshContextProvider>
          <OutletContainer>
            <Outlet />
          </OutletContainer>
        </>
      ) : (
        <Navigate to={routes.signIn.path} state={{ from: location }} replace />
      )}
    </>
  );
};

export default PageHome;
