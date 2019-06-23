import deepFreeze from "deep-freeze";
import {
  addCounter,
  removeCounter,
  incrementCounter
} from "./avoid-array-mutations";

it("adds a number to the list without mutating the original array", () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore); // Deep freeze makes sure the code is free of mutations.
  expect(addCounter(listBefore)).toEqual(listAfter);
});

it("removes a number from an array without mutating the original array", () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(removeCounter(listBefore, 1)).toEqual(listAfter);
});

it("increments counter", () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 11, 20];

  deepFreeze(listBefore);

  expect(incrementCounter(listBefore, 1)).toEqual(listAfter);
});
