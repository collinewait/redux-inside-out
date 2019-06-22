import { createStore } from 'redux';
import reducers from './reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducers, composeWithDevTools());
export default store;
