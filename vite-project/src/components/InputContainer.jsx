function InputContainer({ inputValue, writeToDo, addToDo }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addToDo();
    }
  };

  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={writeToDo}
        onKeyPress={handleKeyPress}
        placeholder="Add a new task... (Press Enter to add)"
        className="todo-input"
      />
      <button onClick={addToDo} className="add-btn" title="Add task (Enter)">
        +
      </button>
    </div>
  );
}

export default InputContainer;
