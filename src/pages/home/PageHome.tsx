import React from "react";
import { NavbarComponent } from "../../components/navbar/NavbarComponent";
import { OutletWrapper } from "../../components/Components";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import routes from "../../utils/helpers/routes/Routes";

const PageHome: React.FC = () => {
  const auth = true;
  const location = useLocation();
  return (
    <>
      {auth ? (
        <>
          <NavbarComponent />
          <OutletWrapper>
            <Outlet />
          </OutletWrapper>
        </>
      ) : (
        <Navigate to={routes.signin.path} state={{ from: location }} replace />
      )}
    </>
  );
};

export default PageHome;
