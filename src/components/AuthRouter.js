import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { observer, inject } from "mobx-react";
import store from "../stores";
const AuthRouter = ({ children, user }) => {
  //   const token = user.getTokenFn()
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (token) {
    return children;
  } else {
    return <Navigate to="/login" replace state={{ from: location }}></Navigate>;
  }
};
export default inject("user")(observer(AuthRouter));
