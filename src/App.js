import React from "react";

const App = ({ value, onIncrement, onDecrement }) => (
  <>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </>
);

export default App;
