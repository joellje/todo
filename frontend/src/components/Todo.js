import React from "react";

export default function Todo(props) {
  const id = props.id;
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      let res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
        headers: { authorization: `Bearer ${token}` },
      });
      let result = await res.json();
      if (res.status === 200) {
        props.getAllTodos();
      } else {
        alert(`ERROR`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = async () => {
    try {
      let res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
      });
      let result = await res.json();
      if (res.status === 200) {
        props.getAllTodos();
      } else {
        alert(`ERROR`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="card w-96 bg-neutral text-neutral-content">
      <div class="card-body items-center text-center">
        <h2 class={`card-title ${props.completed ? "line-through" : ""}`}>
          {props.task}
        </h2>
        <div class="card-actions justify-end">
          <button class="btn btn-primary" onClick={handleComplete}>
            Complete
          </button>
          <button class="btn btn-ghost" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}
