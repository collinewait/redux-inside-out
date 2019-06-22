import { createStore } from 'redux';
import counterReducer from './reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(counterReducer, composeWithDevTools());
console.log(store.getState());
store.dispatch({ type: 'INCREMENT'});
console.log(store.getState());
export default store;
