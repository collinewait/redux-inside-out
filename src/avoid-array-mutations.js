export const addCounter = list => {
  return list.concat([...list, 0]); //use concat or spread operator which does not mutate the original array
};

export const removeCounter = (list, index) => {
  return [...list.slice(0, index), ...list.slice(index + 1)]; // use slice which does not mutate the original array like splice
};

export const incrementCounter = (list, index) => {
  return [...list.slice(0, index), list[index] + 1, ...list.slice(index + 1)];
};