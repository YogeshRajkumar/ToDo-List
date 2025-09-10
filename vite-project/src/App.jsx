import "./app.css";

import { useState, useEffect } from "react";

import InputContainer from "./components/inputContainer";

import ToDoContainer from "./components/ToDoContainer";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const savedTodos = localStorage.getItem("myTodos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos));
  }, [todos]);

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

  return (
    <main>
      <h1>To Do List</h1>

      <InputContainer
        inputValue={inputValue}
        writeToDo={writeToDo}
        addToDo={addToDo}
      />

      <ToDoContainer
        todos={todos}
        deleteToDo={deleteToDo}
        toggleComplete={toggleComplete}
      />
    </main>
  );
}

export default App;
