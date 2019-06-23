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
        <ul>
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
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
