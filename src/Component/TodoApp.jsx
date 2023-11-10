import React, { useState } from "react";
import '../Component/TodoApp.css';


const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);


  const addTodo = () => {
    if (input !== "") {
      if (editId) {
        const updatedTodos = todos.map((todo) =>
          todo.id === editId ? { id: editId, text: input } : todo
        );
        setTodos(updatedTodos);
        setEditId(null);
      } else {
        const newTodo = {
          id: new Date().getTime(),
          text: input,
        };
        setTodos([...todos, newTodo]);
      }
      setInput("");
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setInput(todoToEdit.text);
    setEditId(id);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    addTodo();
  };  

    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="button" type="submit" onClick={addTodo}>{editId ? "Update" : "Add"}</button> </form>
        <div className="data">
          <table>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td><li>{todo.text}</li></td>
                  <td>
                    <button className="button" onClick={() => editTodo(todo.id)}>
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="button" onClick={() => deleteTodo(todo.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default TodoApp;
