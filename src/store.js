//import { createStore } from "redux";
import counterReducer from "./reducer.js";
import ReactDOM from "react-dom";
import { composeWithDevTools } from "redux-devtools-extension";

const createStore = reducer => {
  let state;
  let listeners = []; // keep track of all change listeners

  const getState = () => state; // return the current state

  const dispatch = action => {
    state = reducer(state, action); // to calculate the new state we call the reducer with the current state and the action dispatched
    listeners.forEach(listener => listener()); // update listeners after updating state
  };

  const subscribe = listener => {
    listeners.push(listener);
    return () => {
      // instead of writing unsubscribe, return a function that removes the listener. similar logic with unsubscribe
      listeners = listeners.filter(l => l !== listener);
    };
  };
  // by the time the store is returned, we want to have the initial state populated
  // so we dispatch a dummy action just to get the reducer to return the initial value
  dispatch({});

  return { getState, dispatch, subscribe };
};

const store = createStore(counterReducer);

export default store;
