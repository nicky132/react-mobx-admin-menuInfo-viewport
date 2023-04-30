// 用于创建路由(可以根据数据，生成动态的路由)
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
// react 动态加载组件 @loadable/component
import loadable from "@loadable/component";
import { observer, inject } from "mobx-react";
import { useEffect } from "react";
import { message } from "antd";
const PrivateRoute = (props) => {
  console.log("props==", props);
  const navgateTO = useNavigate();

  // 1. 拿到访问地址和 token
  const location = useLocation();
  let token = localStorage.getItem("token");

  // 2. 组件加载完毕进行判断
  useEffect(() => {
    // 3. 如果访问的是登录页面， 并且有token， 跳转到首页
    if (location.pathname === "/login" && token) {
      message.success("您已经登录！");
      // 进行跳转
      return navgateTO("/page");
    }
    // 4. 如果访问的不是登录页面，并且没有token， 跳转到登录页
    if (location.pathname !== "/login" && !token) {
      message.error("您还未登录！");
      // 进行跳转
      return navgateTO("/login");
    }
  });

  function bindRouter(list) {
    let arr = [];
    list.map((item) => {
      const ComponentNode = loadable(() => {
        // if (!localStorage.getItem("userInfo")) {
        //   return import("../pages/Login");
        // }
        return import("./" + item.componentPath);
      });
      if (item.menuChilds && item.menuChilds.length > 0) {
        if (item.isContainChildren) {
          arr.push({
            path: item.pathRoute,
            element: <ComponentNode />,
            children: [...bindRouter(item.menuChilds)],
          });
        } else {
          arr.push({
            path: item.pathRoute,
            element: <ComponentNode />,
            children: [...bindRouter(item.menuChilds)],
          });
        }
      } else {
        arr.push({
          path: item.pathRoute,
          element: <ComponentNode />,
        });
      }
    });
    console.log("bindRouter=arr", arr);
    return arr;
  }

  const menuInfo = props.user.userInfo.menuInfo
    ? props.user.userInfo.menuInfo
    : [];
  return useRoutes([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/index",
      element: <Home />,
      children: [...bindRouter(menuInfo)],
    },
    {
      path: "*",
      element: <NotFound />,
      children: [...bindRouter(menuInfo)],
    },
  ]);
};

export default inject("user")(observer(PrivateRoute));
