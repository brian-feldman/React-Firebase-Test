import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "./App";
import GlobalStyle from "./core/style/global.style";
import reportWebVitals from "./reportWebVitals";
import { history } from "./shared/helpers/route.helper";
import { Provider } from "react-redux";
import store from "./redux";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
