import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  // Fetch todos
  const getTodos = async () => {
    const res = await axios.get("http://localhost:3000/todos");
    setTodos(res.data);
  };

  // Add todo
  const addTodo = async () => {
    if (!text) return;
    await axios.post("http://localhost:3000/todos", { text });
    setText("");
    getTodos();
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:3000/todos/${id}`);
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div style={{ width: "400px", margin: " 20px auto" }}>
      <h2>Todo App</h2>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button
              onClick={() => deleteTodo(todo._id)}
              style={{ marginLeft: "10px",marginTop:"10px", color: "red" }}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
