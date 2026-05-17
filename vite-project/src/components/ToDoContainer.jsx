import Todo from "./Todo";

function ToDoContainer({
  todos,
  deleteToDo,
  toggleComplete,
  editingId,
  editValue,
  startEdit,
  saveEdit,
  cancelEdit,
  setEditValue,
}) {
  return (
    <div className="todos-list">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          deleteToDo={deleteToDo}
          toggleComplete={toggleComplete}
          editingId={editingId}
          editValue={editValue}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          setEditValue={setEditValue}
        />
      ))}
    </div>
  );
}

export default ToDoContainer;
