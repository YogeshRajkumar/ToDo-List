function InputContainer({ inputValue, writeToDo, addToDo }) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={inputValue}
        onChange={writeToDo}
        placeholder="Leave a Note"
      />
      <button onClick={addToDo}>+</button>
    </div>
  );
}

export default InputContainer;
