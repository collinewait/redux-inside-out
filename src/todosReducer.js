import { combineReducers } from "redux";
import byId, * as fromById from "./byId";
import createList, * as fromCreateList from "./createList";

const listByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed")
});

const todos = combineReducers({
  // You can use several combineReducers in several places
  byId,
  listByFilter
});

export const getVisibleTodosImpl = (state, filter) => {
  const ids = fromCreateList.getIds(state.listByFilter[filter]);
  return ids.map(id => fromById.getTodo(state.byId, id));
};

export const getVisibleTodos = (state, filter) =>
  getVisibleTodosImpl(state.todos, filter);

export const todoApp = combineReducers({
  todos
});
