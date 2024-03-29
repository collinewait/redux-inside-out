import counterReducer from "./reducer.js";
import { todoApp } from "./todosReducer";
import ReactDOM from "react-dom";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";


const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }
  // the last item is in createStore is called an enhancer
  // USE: createStore(reducer, persistedState, enhancer)
  // OR: createStore(reducer, enhancer)
  return createStore(todoApp, applyMiddleware(...middlewares));
};

export default configureStore;
