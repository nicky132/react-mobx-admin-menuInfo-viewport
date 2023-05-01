import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import NotFound from "./NotFound";
import PrivateRoute from "../components/PrivateRoute";
import Layout from "../components/Layout";
import AuthorizedRoute from "../components/authorized";
import Container from "../components/container";
import { routes } from "../routes";
function App() {
  return (
    <Router>
      <Suspense fallback={<div>加载中...</div>}>
        {/* <Routes>
          <Route exact path="/login" element={<Login />}></Route> */}
        {/* <AuthorizedRoute path="/*" session={session}>
          <Container routes={routes} location={location} />
        </AuthorizedRoute> */}
        {/* <PrivateRoute path="/*" /> */}
        {/* <Route path="/*" element={<Layout />}></Route> */}
        {/* <Route path="*" component={<NotFound />} /> */}
        {/* <PrivateRoute path="/" /> */}
        {/* <PrivateRoute path="/" /> */}
        {/* <AuthorizedRoute path="/*">
            <Container routes={routes} />
          </AuthorizedRoute> */}
        {/* <Route
          exact
          path="/*"
          element={
            <AuthorizedRoute>
              <Container routes={routes} />
            </AuthorizedRoute>
          }
        ></Route> */}
        {/* <Route
          path="*"
          render={() => {
            return <div>404</div>;
          }}
        /> */}
        {/* <ProtectedRoute exact path='/login' component={Login} /> */}
        {/* <Route path="/*" element={<div>2343</div>}></Route> */}
        {/* <AuthorizedRoute path="/*">
            <Container routes={routes} />
          </AuthorizedRoute> */}
        {/* <PrivateRoute path="/*" /> */}
        {/* <PrivateRoute />
          <Route path="*" element={<NotFound />}></Route>
        </Routes> */}
        <PrivateRoute />
      </Suspense>
    </Router>
  );
}

export default App;
