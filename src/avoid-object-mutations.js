export const toggleTodo = (todo) => {
    return {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed
    };
};