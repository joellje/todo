import React, { useState, useEffect } from "react";
import Todo from "../components/Todo.js";

export default function LandingPage() {
  const [task, setTask] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    const res = await fetch("http://localhost:5000/todos/", {
      method: "GET",
    });
    const allTodos = await res.json();
    if (res.status === 200) {
      console.log(allTodos);
      setAllTodos(allTodos);
    } else {
      console.log("Error getting all Todos.");
    }
  };

  const handleDeleteAll = async () => {
    const res = await fetch("http://localhost:5000/todos/", {
      method: "DELETE",
    });
    if (res.status === 200) {
      console.log("All Todos Deleted");
    } else {
      console.log("Error deleting all Todos.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("http://localhost:5000/todos/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: `${task}`,
      }),
    });
    const resJson = await res.json();
    if (res.status === 200) {
      console.log("Created!");
      setTask("");
      getAllTodos();
    } else {
      alert(resJson.messages);
    }
  };

  return (
    <form>
      <label>
        Task:
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </label>
      <input
        type="submit"
        value="Submit"
        className="text-xl mb-2 border-2"
        onClick={handleSubmit}
      />
      <button className="text-xl mb-2 border-2" onClick={handleDeleteAll}>
        Delete All
      </button>
      <div className="pt-10 flex flex-col gap-2 justify-center">
        {allTodos.map((todo) => (
          <Todo
            task={todo.task}
            key={todo._id}
            id={todo._id}
            completed={todo.completed}
          ></Todo>
        ))}
      </div>
    </form>
  );
}
