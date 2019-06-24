import { combineReducers } from "redux";
//  creating and updating a todo in response to an action is
// is a separate operation and needs to be handles by a separate
//function called "todo" Pattern: Reducer composition
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };

    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };

    default:
      return state;
  }
};
export const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];

    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));

    default:
      return state;
  }
};

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

export const todoApp = combineReducers({
  todos,
});
