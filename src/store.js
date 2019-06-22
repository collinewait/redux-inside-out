import { createStore } from "redux";
import counterReducer from "./reducer.js";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(counterReducer, composeWithDevTools());

const displayValue = () => {
    document.body.innerText = store.getState();
}

store.subscribe(displayValue);

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
export default store;
