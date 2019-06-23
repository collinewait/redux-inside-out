export const addCounter = list => {
  return list.concat([...list, 0]); //use concat which does not mutate the original array
};

export const removeCounter = (list, index) => {
  list.splice(index, 1);
  return list;
};
