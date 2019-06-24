import React from "react";
import { connect } from "react-redux";
import { v4 } from 'node-uuid';
import FilterLink from './FilterLink'

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
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(todo => todo.completed);
    case "SHOW_ACTIVE":
      return todos.filter(todo => !todo.completed);
  }
};

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

const TodoList = ({ todos, toggleTodo }) => (
  <ul>
    {todos &&
      todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
      ))}
  </ul>
);

const mapStateToTodoListProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
});
const mapDispatchToTodoListProps = dispatch => ({
  toggleTodo(id) {
    dispatch(toggleTodo(id));
  }
});
const VisibleTodoList = connect(
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList);

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
    <FilterLink filter="actve">Active</FilterLink>{" "}
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
