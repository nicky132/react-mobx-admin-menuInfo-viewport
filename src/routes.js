import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { hasPermission } from "./utils/auth";

import Home from "./pages/Home";
import About from "./pages/About";
import Topics, { Topic } from "./pages/Topics";
export const routes = [
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    path: "/app",
    exact: true,
    component: Home,
  },
  {
    path: "/app/home",
    exact: true,
    component: Home,
  },
  {
    path: "/app/about",
    component: About,
  },
  {
    path: "/app/topics",
    component: Topics,
    routes: [
      {
        path: "/app/topics/:topicId",
        component: Topic,
      },
    ],
  },
];
export function RouteWithSubRoutes(route) {
  let { permission, path, routes } = route;
  let navigate = useNavigate();
  if (!hasPermission(permission, path)) {
    navigate("/login");
    return (
      <div>
        <span>no auth</span>
      </div>
    );
  }
  // if(/^\/noAuth/.test(route.path)){
  //     setTimeout(()=>{
  //         // window.location.href = 'http://www.**.com';
  //         history.push("/login");
  //     }, 1000);
  //     return (
  //         <div>
  //             <span>no auth</span>
  //         </div>
  //     )
  // }
  return (
    <Route
      path={path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={routes} permission={permission} />
      )}
    />
  );
}
