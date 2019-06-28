import { normalize } from "normalizr";

import * as api from "../api/fakeRemote";
import * as schema from "../schema";
import * as types from "./types";
import {
  getIsFetching,
} from "../todosReducer";

export const addTodo = text => dispatch =>
  api.addTodo(text).then(response => {
    dispatch({
      type: types.ADD_TODO_SUCCESS,
      response: normalize(response, schema.todo)
    });
  });

export const toggleTodo = id => (dispatch) => 
api.toggleTodo(id).then(response => {
  dispatch({
    type: types.TOGGLE_TODO_SUCCESS,
    response: normalize(response, schema.todo)
  })
});

export const receiveTodos = (filter, response) => ({
    type: types.RECEIVE_TODOS,
    filter,
    response
  });
  
export const requestTodos = filter => ({
    type: types.REQUEST_TODOS,
    filter
  });

export const fetchTodos = filter => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
      return Promise.resolve();
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(
      response => {
        dispatch(receiveTodos(filter, normalize(response, schema.arrayOfTodos)));
      },
      error => {
        dispatch({
          type: types.FETCH_TODOS_FAILURE,
          filter,
          message: error.message || "something went wrong"
        });
      }
    );
  };