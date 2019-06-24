import { v4 } from "node-uuid";

// fake in-memory implementation of something
// of something that would be implemented by calling a rest service

const fakeDatabase = {
  todos: [
    {
      id: v4(),
      text: "hello",
      completed: true
    },
    {
      id: v4(),
      text: "hi",
      completed: true
    },
    {
      id: v4(),
      text: "food time",
      completed: false
    }
  ]
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = filter =>
  delay(500).then(() => {
      if(Math.random() > 0.5) {
        throw new Error('Boom!')
      }
    switch (filter) {
      case "all":
        return fakeDatabase.todos;
      case "active":
        return fakeDatabase.todos.filter(t => !t.completed);
      case "completed":
        return fakeDatabase.todos.filter(t => t.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  });
