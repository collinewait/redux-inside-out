import React from "react";

import Footer from './footer/component';
import VisibleTodoList from './todoList/container/VisibleTodoList';
import AddTodo from './todo/components/AddTodo';

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;
