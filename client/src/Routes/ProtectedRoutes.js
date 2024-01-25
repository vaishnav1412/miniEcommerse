import React from "react";
import { Navigate } from "react-router-dom";
import { RouteObjects } from "./RouteObjests";

export const ProtectedRoutesUser = (props) => {
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to={RouteObjects.Login} />;
  }
};

export const ProtectedRoutesAdmin = (props) => {
  if (localStorage.getItem("admintoken")) {
    return props.children;
  } else {
    return <Navigate to={RouteObjects.AdminLogin} />;
  }
};

