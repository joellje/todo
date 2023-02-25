import React, { useState, useEffect } from "react";
import Todo from "../components/Todo.js";
import { useNavigate } from "react-router-dom";

export default function TodoPage() {
  const [task, setTask] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    getAllTodos();
  }, []);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(`/`);
  };

  const getAllTodos = async () => {
    const res = await fetch("http://localhost:5000/todos/", {
      method: "GET",
      headers: { authorization: `Bearer ${token}` },
    });
    const allTodos = await res.json();
    if (res.status === 200) {
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
      setError("");
      getAllTodos();
    } else {
    }
  };

  const handleDeleteAll = async () => {
    const res = await fetch("http://localhost:5000/todos/", {
      method: "DELETE",
      headers: { authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      setError("");
      getAllTodos();
    } else {
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
      setError(resJson.messages);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center align-middle pt-5">
        <div
          class={`alert alert-error shadow-lg w-1/2 ${
            error === "" ? "hidden" : ""
          }`}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
        <button
          class="fixed btn btn-secondary bottom-5 right-5"
          onClick={handleLogout}
        >
          Log Out
        </button>
        <div className="flex flex-col justify-center align-middle items-center mt-10 gap-5">
          <div className="flex flex-row gap-5 align-middle items-center">
            <div class="task-input">
              <label>
                <input
                  type="text"
                  value={task}
                  placeholder="Type task here"
                  class="input input-bordered input-primary w-full max-w-xs"
                  onChange={(e) => setTask(e.target.value)}
                  onFocus={(e) => {
                    setError("");
                  }}
                />
              </label>{" "}
            </div>
            <div class="submit">
              <input
                type="submit"
                value="Submit"
                class="btn btn-outline btn-primary"
                onClick={handleSubmit}
              />
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <div>
              <button class="btn" onClick={handleDeleteAll}>
                Delete All
              </button>
            </div>

            <div>
              <button class="btn" onClick={handleCompleteAllTodos}>
                Complete All
              </button>
            </div>
          </div>
          <div className="pt-10 flex flex-col gap-2 justify-center">
            {allTodos.map((todo) => (
              <Todo
                task={todo.task}
                key={todo._id}
                id={todo._id}
                completed={todo.completed}
                getAllTodos={getAllTodos}
              ></Todo>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
