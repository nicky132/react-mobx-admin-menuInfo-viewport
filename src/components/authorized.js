import React from "react";
// import { Route , Redirect} from "react-router-dom";
import { Route, Navigate, useLocation } from "react-router-dom";
// import Redirect from "react-router-dom";
import { isLogin } from "../utils/auth";
import { observer, inject } from "mobx-react";
const AuthorizedRoute = ({ children, ...rest }) => {
  console.log("AuthorizedRoute");
  let { session } = rest;
  const location = useLocation();
  console.log(children, "location");
  return (
    <Route exact path="/" element={<div>2343</div>}></Route>
    // <Route
    //   {...rest}
    //   render={(props) => {
    //     if (isLogin(session)) {
    //       console.log("childrenisLogin", children);
    //       return children;
    //     } else {
    //       console.log("childrennoLogin", children);
    //       return (
    //         <Navigate to={{ pathname: "/", state: { from: props.location } }} />
    //       );
    //     }
    //   }}
    // />
    // <Route
    //   {...rest}
    //   element={
    //     isLogin(session) ? (
    //       children
    //     ) : (
    //       <Navigate
    //         to={{
    //           pathname: "/login",
    //           state: { from: location },
    //         }}
    //         replace={true}
    //       />
    //     )
    //   }
    //   // render={({ location }) =>
    //   //   isLogin(session) ? (
    //   //     children
    //   //   ) : (
    //   //     //   <Redirect
    //   //     //     to={{
    //   //     //       pathname: "/login",
    //   //     //       state: { from: location },
    //   //     //     }}
    //   //     //   />
    //   //     <Navigate
    //   //       to={{
    //   //         pathname: "/login",
    //   //         state: { from: location },
    //   //       }}
    //   //     />
    //   //   )
    //   // }
    // />
  );
};
// export default inject("global")(observer(AuthorizedRoute));
export default AuthorizedRoute;
