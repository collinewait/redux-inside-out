import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getVisibleTodos,
  getIsFetching,
  getErrorMessage
} from "../../todosReducer";
import { fetchTodos, toggleTodo, receiveTodos } from "../../actions";
import TodoList from "../components/TodoList";
import FetchError from '../../Error/component/FetchError';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }
  render() {
    const { toggleTodo, todos, isFetching, errorMessage } = this.props;
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError message={errorMessage} onRetry={() => this.fetchData()} />
      );
    }
    return <TodoList todos={todos} toggleTodo={toggleTodo} />;
  }
}
const mapStateToTodoListProps = (state, { match: { params } }) => {
  const filter = params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    errorMessage: getErrorMessage(state, filter),
    isFetching: getIsFetching(state, filter),
    filter
  };
};
VisibleTodoList = withRouter(
  connect(
    mapStateToTodoListProps,
    { toggleTodo, receiveTodos, fetchTodos }
  )(VisibleTodoList)
);

export default VisibleTodoList;
