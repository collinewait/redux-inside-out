import { addCounter } from "./avoid-array-mutations";

it("", () => {
  const listBefore = [];
  const listAfter = [0];

  expect(addCounter(listBefore)).toEqual(listAfter);
});
