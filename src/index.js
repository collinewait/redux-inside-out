import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import TodoApp from "./TodoApp";
import * as serviceWorker from "./serviceWorker";
//import { Provider } from "react-redux";

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

// For demo purposes only. 
// There is a better way of handling changes and updating states
let nextTodoId = 0;
let typedText = "";
 
const handleChange = event => {
  event.persist();
  typedText = event.target.value;
};
const render = () => {
  ReactDOM.render(
    <TodoApp
      addTodo={() => {
        store.dispatch({
          type: "ADD_TODO",
          text: typedText,
          id: nextTodoId++
        });
        // Do not write this kind of code in production.
        // You can work with state values
        // I wrote it for fun 😁:) 
        const input = document.getElementById("input1");
        input.value = "";
        typedText = "";
      }}
      todos={store.getState().todos}
      handleChange={handleChange}
    />,
    document.getElementById("root")
  );
};

store.subscribe(render);
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
