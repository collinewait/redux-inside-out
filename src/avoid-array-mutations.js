export const addCounter = (list) => {
    return list.concat([...list, 0]); //use concat which does not mutate the original array
}