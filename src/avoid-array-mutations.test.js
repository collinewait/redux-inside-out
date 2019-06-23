import deepFreeze from "deep-freeze";
import { addCounter } from "./avoid-array-mutations";

it("adds a number to the list without mutating the original array", () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore); // Deep freeze makes sure the code is free of mutations.
  expect(addCounter(listBefore)).toEqual(listAfter);
});
