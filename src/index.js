import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./configureStore";
import Root from "./Root";


const store = configureStore();

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

ReactDOM.render(<Root store={store} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
