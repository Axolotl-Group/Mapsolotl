import React from "react";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./components/App.jsx";
import store from "./store.js";

import styles from "./styles.scss";

// const root = ReactDOM.createRoot(document.getElementById('root'));

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
