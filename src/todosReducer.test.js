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

  it("toggles todo", () => {
    const stateBefore = [
      {
        id: 0,
        text: "Redux inside out",
        completed: false
      },
      {
        id: 1,
        text: "Learn R",
        completed: false
      }
    ];
    const action = {
      type: "TOGGLE_TODO",
      id: 1
    };

    const stateAfter = [
      {
        id: 0,
        text: "Redux inside out",
        completed: false
      },
      {
        id: 1,
        text: "Learn R",
        completed: true
      }
    ];

    deepFreeze(stateAfter);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });
});
