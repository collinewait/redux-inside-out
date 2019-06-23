import React, { Component } from "react";

const FilterLink = ({
  filter,
  children,
  setVisibilityFilter,
  currentFilter
}) => {
  if (filter === currentFilter) {
    // if active filter

    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        setVisibilityFilter(filter);
      }}
    >
      {children}
    </a>
  );
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
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
    ))}
  </ul>
);
class TodoApp extends Component {
  render() {
    const {
      addTodo,
      todos,
      handleChange,
      toggleTodo,
      setVisibilityFilter,
      visibilityFilter
    } = this.props;
    const visibleTodos = getVisibleTodos(todos, visibilityFilter);
    return (
      <div>
        <input id="input1" onChange={handleChange} />
        <button onClick={addTodo}>Add Todo</button>
        <TodoList todos={visibleTodos} toggleTodo={toggleTodo} />
        <p>
          Show:{" "}
          <FilterLink
            filter="SHOW_ALL"
            setVisibilityFilter={setVisibilityFilter}
            currentFilter={visibilityFilter}
          >
            All
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_ACTIVE"
            setVisibilityFilter={setVisibilityFilter}
            currentFilter={visibilityFilter}
          >
            Active
          </FilterLink>{" "}
          <FilterLink
            filter="SHOW_COMPLETED"
            setVisibilityFilter={setVisibilityFilter}
            currentFilter={visibilityFilter}
          >
            Completed
          </FilterLink>
        </p>
      </div>
    );
  }
}

export default TodoApp;
