import React from "react";

export default function Todo({
  todo,
  deleteToDo,
  toggleComplete,
  editingId,
  editValue,
  startEdit,
  saveEdit,
  cancelEdit,
  setEditValue,
}) {
  const isEditing = editingId === todo.id;

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit(todo.id);
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="todo-checkbox"
          aria-label="Mark as complete"
        />

        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyPress={handleEditKeyPress}
            className="edit-input"
            autoFocus
          />
        ) : (
          <p className="todo-text">{todo.text}</p>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button
              onClick={() => saveEdit(todo.id)}
              className="action-btn save-btn"
              title="Save (Enter)"
            >
              ✓
            </button>
            <button
              onClick={cancelEdit}
              className="action-btn cancel-btn"
              title="Cancel (Esc)"
            >
              ✕
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => startEdit(todo)}
              className="action-btn edit-btn"
              title="Edit"
            >
              ✎
            </button>
            <button
              onClick={() => deleteToDo(todo.id)}
              className="action-btn delete-btn"
              title="Delete"
            >
              🗑
            </button>
          </>
        )}
      </div>
    </div>
  );
}
