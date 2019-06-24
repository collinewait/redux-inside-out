//import { createStore } from "redux";
import counterReducer from "./reducer.js";
import { todoApp } from "./todosReducer";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// const createStore = reducer => {
//   let state;
//   let listeners = []; // keep track of all change listeners

//   const getState = () => state; // return the current state

//   const dispatch = action => {
//     state = reducer(state, action); // to calculate the new state we call the reducer with the current state and the action dispatched
//     listeners.forEach(listener => listener()); // update listeners after updating state
//   };

//   const subscribe = listener => {
//     listeners.push(listener);
//     return () => {
//       // instead of writing unsubscribe, return a function that removes the listener. similar logic with unsubscribe
//       listeners = listeners.filter(l => l !== listener);
//     };
//   };
//   // by the time the store is returned, we want to have the initial state populated
//   // so we dispatch a dummy action just to get the reducer to return the initial value
//   dispatch({});

//   return { getState, dispatch, subscribe };
// };

//const store = createStore(counterReducer); // left out not to break counter and for demo. We use one store in applications

// console.log('Initial State:');
// console.log(store.getState())
// console.log('-------------');

// console.log('Dispatching ADD_TODO');
// store.dispatch({
//     type: 'ADD_TODO',
//     id: 0,
//     text: 'Redux inside out'
// })
// console.log('Current State:');
// console.log(store.getState())
// console.log('-------------');

// console.log('Dispatching TOGGLE_TODO')
// store.dispatch({
//     type: 'TOGGLE_TODO',
//     id: 0,
// })
// console.log('Current State:');
// console.log(store.getState())
// console.log('-------------');

// console.log('Dispatching SET_VISIBILITY_FILTER')
// store.dispatch({
//     type: 'SET_VISIBILITY_FILTER',
//     filter: 'SHOW_COMPLETED',
// })
// console.log('Current State:');
// console.log(store.getState())
// console.log('-------------');

// Now days we can easily use redux devtools
const addPromiseSupportToDispatch = store => {
  const rawDispatch = store.dispatch;
  return action => {
    console.log('Actionnnn', action)
    if (typeof action.then === "function") {
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  };
};
const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }
  return action => {
    console.group(action.type);
    console.log("%c prev state", "color: gray", store.getState());
    console.log("%c action", "color: blue", action);
    const returnValue = rawDispatch(action);
    console.log("%c next state", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const configureStore = () => {
  // We can pass the persisted state as the second argument to createStore
  // and it will override the value specified by the reducers
  // DO NOT pass the initial state to creeateStore, use it in reducers.
  // Passing the persisted state is fine since it was obtained from the store itself
  const store = createStore(todoApp);

  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseSupportToDispatch(store);

  return store;
};

export default configureStore;
