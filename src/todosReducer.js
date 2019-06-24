import { combineReducers } from "redux";
//  creating and updating a todo in response to an action is
// is a separate operation and needs to be handles by a separate
//function called "todo" Pattern: Reducer composition
export const byId = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_TODOS":
      const nextState = { ...state };
      action.response.forEach(todo => {
        nextState[todo.id] = todo;
      });
      return nextState;
    default:
      return state;
  }
};

// keeps track of all the added Ids
const allIds = (state = [], action) => {
  if (action.filter !== "all") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const activeIds = (state = [], action) => {
  if (action.filter !== "active") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const completedIds = (state = [], action) => {
  if (action.filter !== "completed") {
    return state;
  }
  switch (action.type) {
    case "RECEIVE_TODOS":
      return action.response.map(todo => todo.id);
    default:
      return state;
  }
};

const idsByFilter = combineReducers({
  all: allIds,
  active: activeIds,
  completed: completedIds
});

const todos = combineReducers({
  // You can use several combineReducers in several places
  byId,
  idsByFilter
});

export const getVisibleTodosImpl = (state, filter) => {
  const ids = state.idsByFilter[filter];
  return ids.map(id => state.byId[id]);
};

export const getVisibleTodos = (state, filter) =>
  getVisibleTodosImpl(state.todos, filter);

export const todoApp = combineReducers({
  todos
});
