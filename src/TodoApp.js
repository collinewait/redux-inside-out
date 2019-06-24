import React, { Component } from "react";
import { connect } from "react-redux";
import { v4 } from "node-uuid";
import FilterLink from "./FilterLink";
import { withRouter } from "react-router-dom";
import { getVisibleTodos } from "./todosReducer";
import { fetchTodos } from "./fakeRemote";

const addTodo = text => ({
  type: "ADD_TODO",
  id: v4(),
  text
});

const toggleTodo = id => ({
  type: "TOGGLE_TODO",
  id
});

// const mapStateToLinkProps = (state, ownProps) => ({
//   active: ownProps.filter === state.visibilityFilter
// });
// const mapDispatchToLinkProps = (dispatch, ownProps) => ({
//   onClick() {
//     dispatch(setVisibilityFilter(ownProps.filter));
//   }
// });
// const FilterLink = connect(
//   mapStateToLinkProps,
//   mapDispatchToLinkProps
// )(Link);

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then(todos =>
      console.log(this.props.filter, todos)
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then(todos =>
        console.log(this.props.filter, todos)
      );
    }
  }
  render() {
    return <TodoList {...this.props} />;
  }
}

const TodoList = ({ todos, toggleTodo }) => (
  <ul>
    {todos &&
      todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
      ))}
  </ul>
);

const mapStateToTodoListProps = (state, { match: { params } }) => {
  const filter = params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter
  };
};
// const mapDispatchToTodoListProps = dispatch => ({
//   toggleTodo(id) {
//     dispatch(toggleTodo(id));
//   }
// });
VisibleTodoList = withRouter(
  connect(
    mapStateToTodoListProps,
    { toggleTodo: toggleTodo }
  )(VisibleTodoList)
);

let AddTodo = ({ dispatch }) => {
  let input;
  return (
    <>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </>
  );
};
// AddTodo = connect(
//   null, // makes sure there is no subscription to the store
//   dispatch => {
//     return {dispatch}
//   }
// )(AddTodo)

AddTodo = connect()(AddTodo); // dispatch will be injected as a prop
const Footer = () => (
  <p>
    Show: <FilterLink filter="all">All</FilterLink>{" "}
    <FilterLink filter="active">Active</FilterLink>{" "}
    <FilterLink filter="completed">Completed</FilterLink>
  </p>
);
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;
