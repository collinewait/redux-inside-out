import deepFreeze from "deep-freeze";
import { toggleTodo } from "./avoid-object-mutations";

it("toggles todo without mutating the object", () => {
  const todoBefore = {
    id: 0,
    text: "Redux inside out",
    completed: false
  };
  const todoAfter = {
    id: 0,
    text: "Redux inside out",
    completed: true
  };

  deepFreeze(todoBefore);

  expect(toggleTodo(todoBefore)).toEqual(todoAfter);
});
