import "./app.css";

import { useState, useEffect } from "react";

import InputContainer from "./components/inputContainer";

import ToDoContainer from "./components/ToDoContainer";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    try {
      const savedTodos = localStorage.getItem("myTodos");
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("myTodos", JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  }, [todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  function writeToDo(e) {
    setInputValue(e.target.value);
  }

  function addToDo() {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
    }
  }

  function deleteToDo(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  function toggleComplete(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function startEdit(todo) {
    setEditingId(todo.id);
    setEditValue(todo.text);
  }

  function saveEdit(id) {
    if (editValue.trim() !== "") {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, text: editValue } : todo
        )
      );
    }
    setEditingId(null);
    setEditValue("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditValue("");
  }

  function clearCompleted() {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }

  return (
    <main className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>✓ My Tasks</h1>
          <p className="subtitle">Stay organized and productive</p>
        </header>

        <InputContainer
          inputValue={inputValue}
          writeToDo={writeToDo}
          addToDo={addToDo}
        />

        <div className="stats-bar">
          <div className="stat">
            <span className="stat-label">Active</span>
            <span className="stat-number">{activeCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Completed</span>
            <span className="stat-number">{completedCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total</span>
            <span className="stat-number">{todos.length}</span>
          </div>
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        <ToDoContainer
          todos={filteredTodos}
          deleteToDo={deleteToDo}
          toggleComplete={toggleComplete}
          editingId={editingId}
          editValue={editValue}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          setEditValue={setEditValue}
        />

        {filteredTodos.length === 0 && (
          <div className="empty-state">
            <p className="empty-icon">📝</p>
            <p className="empty-text">
              {filter === "all"
                ? "No tasks yet. Add one to get started!"
                : filter === "completed"
                  ? "No completed tasks yet."
                  : "All caught up! No active tasks."}
            </p>
          </div>
        )}

        {todos.length > 0 && completedCount > 0 && (
          <div className="action-bar">
            <button className="clear-btn" onClick={clearCompleted}>
              Clear Completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
