import React, { Component } from "react";
import store from "./store";

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { filter, children } = this.props;
    const state = store.getState().visibilityFilter;
    return (
      <Link
        active={filter === state}
        onClick={() => {
          store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter
          });
        }}
      >
        {children}
      </Link>
    );
  }
}

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
    {todos && todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
);

const AddTodo = ({ addTodo }) => {
  let input;
  return (
    <>
      <input
        ref={node => {
          input = node;
        }}
      />
      <button onClick={() => addTodo(input)}>Add Todo</button>
    </>
  );
};

const Footer = () => (
  <p>
    Show: <FilterLink filter="SHOW_ALL">All</FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
  </p>
);
const TodoApp = ({ addTodo, todos, toggleTodo, visibilityFilter }) => (
  <div>
    <AddTodo addTodo={addTodo} />
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      toggleTodo={toggleTodo}
    />
    <Footer />
  </div>
);

export default TodoApp;
