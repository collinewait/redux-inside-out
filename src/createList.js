import { combineReducers } from "redux";

const createList = filter => {
  const ids = (state = [], action) => {
    switch (action.type) {
      case "RECEIVE_TODOS":
        return action.filter === filter
          ? action.response.map(todo => todo.id)
          : state;
      case "ADD_TODO_SUCCESS":
        return filter !== "completed" ? [...state, action.response.id] : state;
      default:
        return state;
    }
  };
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "REQUEST_TODOS":
        return true;
      case "RECEIVE_TODOS":
      case "FETCH_TODOS_FAILURE":
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch (action.type) {
      case "FETCH_TODOS_FAILURE":
        return action.message;
      case "REQUEST_TODOS":
      case "RECEIVE_TODOS":
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  });
};

export default createList;

export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export const getErrorMessage = state => state.errorMessage;
