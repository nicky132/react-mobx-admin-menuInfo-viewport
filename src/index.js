import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import { Provider } from "mobx-react";
import store from "./store";
import Wrapper from "./wrapper";
const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 *
 * @param {AdaptMode} mode
 * @returns {AdaptMode}
 * @example
 * mode="full-screen"
 * mode="overspread-x"
 * mode="overspread-y"
 */
root.render(
  <Provider {...store}>
    <Wrapper mode="full-screen">
      <App />
    </Wrapper>
  </Provider>
);
