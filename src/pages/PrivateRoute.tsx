import React from "react";
import { useAppSelector } from "../app/hooks";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = useAppSelector((state) => state.auth);
  const isAuthenticated = Boolean(auth.token && auth.user);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
