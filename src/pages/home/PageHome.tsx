import React from "react";
import { NavbarComponent } from "../../components/navbar/NavbarComponent";
import { OutletWrapper } from "../../components/Components";
import { Outlet } from "react-router-dom";

const PageHome: React.FC = () => {
  return (
    <>
      <NavbarComponent />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
    </>
  );
};

export default PageHome;
