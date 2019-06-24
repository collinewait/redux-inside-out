import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./index.css";
//import App from "./App";
import TodoApp from "./TodoApp";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
// const render = () => {
//   ReactDOM.render(
//     <Provider store={store}>
//       <App
//         value={store.getState()}
//         onIncrement={() => {
//           store.dispatch({ type: "INCREMENT" });
//         }}
//         onDecrement={() => {
//           store.dispatch({ type: "DECREMENT" });
//         }}
//       />
//     </Provider>,
//     document.getElementById("root")
//   );
// };

// class Provider extends Component {
//   getChildContext() {
//     // method to be used by react. Children and grand children will receive the context object with the store property
//     return {
//       store: this.props.store
//     };
//   }
//   render() {
//     return this.props.children;
//   }
// }

// for context to work, you have to specify childContextTypes
// on the component that specifies getChildContext
// Provider.childContextTypes = {
//   store: PropTypes.object // essential fot the context to be turned on
// };

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
