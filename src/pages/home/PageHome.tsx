import React from "react";
import { NavbarComponent } from "../../components/common/navbar/NavbarComponent";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import routes from "../../utils/helpers/routes/Routes";
import { OutletContainer } from "../../components/common/container/OutletContainer";

const PageHome: React.FC = () => {
  const auth = true;
  const location = useLocation();
  return (
    <>
      {auth ? (
        <>
          <NavbarComponent />
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
