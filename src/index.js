import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";

import store from "./store";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App
        value={store.getState()}
        onIncrement={() => {
          store.dispatch({ type: "INCREMENT" });
        }}
        onDecrement={() => {
          store.dispatch({ type: "DECREMENT" });
        }}
      />
    </Provider>,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
