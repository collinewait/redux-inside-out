import deepFreeze from "deep-freeze";

import { todos } from "./todosReducer";

describe("todosReducer", () => {
  it("adds todos", () => {
    const stateBefore = [];
    const action = {
      type: "ADD_TODO",
      id: 0,
      text: "Redux inside out"
    };
    const stateAfter = [
      {
        id: 0,
        text: "Redux inside out",
        completed: false
      }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });
});
