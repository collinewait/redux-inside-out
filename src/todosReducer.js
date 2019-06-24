import { combineReducers } from "redux";
import todo from "./todo";
//  creating and updating a todo in response to an action is
// is a separate operation and needs to be handles by a separate
//function called "todo" Pattern: Reducer composition
export const byId = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
    case "TOGGLE_TODO":
      return {
        // return a new lookup table where the value under the id in the action
        // is going to be the result of calling the reducer on the previous value under this id and the action
        ...state,
        [action.id]: todo(state[action.id], action)
      };

    default:
      return state;
  }
};

// keeps track of all the added Ids
const allIds = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.id];
    default:
      return state;
  }
};

const todos = combineReducers({
  // You can use several combineReducers in several places
  byId,
  allIds
});
// export const todoApp = (state = {}, action) => {
//     return {
//         todos: todos(
//             state.todos,
//             action
//         ),
//         visibilityFilter: visibilityFilter(
//             state.visibilityFilter,
//             action
//         )
//     }
// }

// const combineReducers = reducers => {
//   return (state = {}, action) => {// the return value is supposed to be the reducer itself
//     return Object.keys(reducers).reduce((nextState, key) => {
//       nextState[key] = reducers[key](state[key], action);
//       return nextState; // return the next accumulated value
//     }, {}); // return the initial next state {} before all the keys are processed. {} is to be filled gradually by reduce
//   };
// };
const getAllTodos = state =>
  state.allIds.map(id => state.byId[id]);

export const getVisibleTodosImpl = (state, filter) => {
  const allTodos = getAllTodos(state);
  switch (filter) {
    case "all":
      return allTodos;
    case "completed":
      return allTodos.filter(todo => todo.completed);
    case "active":
      return allTodos.filter(todo => !todo.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

export const getVisibleTodos = (state, filter) =>
  getVisibleTodosImpl(state.todos, filter);

export const todoApp = combineReducers({
  todos
});
