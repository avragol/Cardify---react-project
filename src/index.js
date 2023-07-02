import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

/* Muuuuu */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/* redux */
import { Provider } from "react-redux";
import store from "./store/bigPie";

/* axios */
import axios from "axios";

/* axios */
axios.defaults.baseURL = `${process.env.REACT_APP_PROXY}/api`;
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    if (config.url !== "https://hp-api.onrender.com/api/spells") {
      // Check if the request URL is not the specific URL that not need the header 
      config.headers["x-auth-token"] = token;
    }
  }
  return config; // send the new data
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();