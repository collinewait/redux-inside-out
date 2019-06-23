import React, { Component } from "react";
import PropTypes from 'prop-types';

let nextTodoId = 0;
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
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { filter, children } = this.props;
    const { store } = this.context;
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
FilterLink.contextTypes = {
  store: PropTypes.object
};
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

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { store } = this.context;
    const { todos, visibilityFilter } = store.getState();
    return (
      <TodoList
        todos={getVisibleTodos(todos, visibilityFilter)}
        toggleTodo={id => {
          store.dispatch({
            type: "TOGGLE_TODO",
            id
          });
        }}
      />
    );
  }
}

// if we forget to declare the relevant contextTypes,
// the component will not receive the relevant context
// it is essential to declare them
VisibleTodoList.contextTypes = {
  store: PropTypes.object
};

// the second argument is the context
const AddTodo = (props, { store }) => {
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
          store.dispatch({
            type: "ADD_TODO",
            text: input.value,
            id: nextTodoId++
          });
          input.value = "";
        }}
      >
        Add Todo
      </button>
    </>
  );
};

AddTodo.contextTypes = {
  store: PropTypes.object
};

const Footer = () => (
  <p>
    Show:{" "}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>{" "}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>{" "}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
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
