import React from "react";

export default function Todo({ todo, deleteToDo, toggleComplete }) {
  return (
    <div className="todo-container">
      <div className="todo-list">
        <p>{todo.text}</p>
        <div className="check-list">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <button onClick={() => deleteToDo(todo.id)}>Delete</button>
        </div>
      </div>
    </div>
  );
}
