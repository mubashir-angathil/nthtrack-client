import React from "react";
import { Route, Navigate } from "react-router-dom";
declare type ProtectedRoute = {
  auth: boolean;
  path?: string;
  redirect: string;
  index?: boolean;
  element?: React.ReactNode;
};

const ProtectedRoute = ({ auth, redirect, ...props }: ProtectedRoute) => {
  if (!auth) return <Navigate to={redirect} replace />;
  if (auth) return <Route {...props} />;
};

export default ProtectedRoute;
