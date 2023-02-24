import React, { useState, useEffect } from "react";
import Todo from "../components/Todo.js";

export default function TodoPage() {
  const [task, setTask] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  const token = JSON.parse(localStorage.getItem("token"))["value"];

  const getAllTodos = async () => {
    const res = await fetch("http://localhost:5000/todos/", {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
    const allTodos = await res.json();
    if (res.status === 200) {
      console.log(allTodos);
      setAllTodos(allTodos);
    } else {
      console.log("Error getting all Todos.");
    }
  };

  const handleCompleteAllTodos = async () => {
    const res = await fetch("http://localhost:5000/todos/", {
      method: "PUT",
      headers: { authorization: `Bearer ${token}` },
    }); 
    if (res.status === 200) {
      getAllTodos();
    } else {
      console.log("Error completing all todos.");
    }
  };

  const handleDeleteAll = async () => {
    const res = await fetch("http://localhost:5000/todos/", {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      console.log("All Todos Deleted");
      getAllTodos();
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
        authorization: `Bearer ${token}`,
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
    <>
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
      </form>
      <button className="text-xl mb-2 border-2" onClick={handleDeleteAll}>
        Delete All
      </button>
      <button
        className="text-xl mb-2 border-2"
        onClick={handleCompleteAllTodos}
      >
        Complete All
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
    </>
  );
}
