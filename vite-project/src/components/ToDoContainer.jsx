import Todo from "./Todo";

function ToDoContainer({ todos, deleteToDo, toggleComplete }) {
  return (
    <div className="todo-container">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteToDo={deleteToDo}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default ToDoContainer;
