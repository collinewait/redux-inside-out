import React, { Component } from "react";

class TodoApp extends Component {
  render() {
    const { addTodo, todos, handleChange, toggleTodo } = this.props;
    return (
      <div>
        <input id="input1" onChange={handleChange} />
        <button onClick={addTodo}>Add Todo</button>
        <ul>
          {this.props.todos.map(todo => (
            <li key={todo.id} onClick={() => toggleTodo(todo.id)} style={{textDecoration: todo.completed ? 'line-through' : 'none'}}>
              {todo.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
