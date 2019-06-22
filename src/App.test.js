import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import counterReducer from './reducer';

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Counter Reducer", () => {
  it("increments counter to 1 if initial state is 0", () => {
    expect(counterReducer(0, { type: "INCREMENT" })).toBe(1);
  });

  it("increments counter to 2 if initial state is 1", () => {
    expect(counterReducer(1, { type: "INCREMENT" })).toBe(2);
  });

  it("decrements counter to 1 if initial state is 2", () => {
    expect(counterReducer(2, { type: "DECREMENT" })).toBe(1);
  });

  it("decrements counter to 0 if initial state is 1", () => {
    expect(counterReducer(1, { type: "DECREMENT" })).toBe(0);
  });

  it("returns initial state when the type is something else", () => {
    expect(counterReducer(1, { type: "SOMETHING_ELSE" })).toBe(1);
  });

  it(`returns what it considers the initial state when the
      initial state is undefined`, () => {
    expect(counterReducer(undefined, {})).toBe(0);
  });
});
