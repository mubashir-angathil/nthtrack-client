import React from 'react'
import { Outlet } from "react-router-dom"
import { NavbarComponent } from '../../components/navbar/NavbarComponent'

const PageHome: React.FC = () => {
  return <>
    <NavbarComponent />
    <Outlet />
  </>
}

export default PageHome