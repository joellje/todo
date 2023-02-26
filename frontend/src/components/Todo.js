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
      if (res.status === 200) {
        props.getAllTodos();
      } else {
        alert(`ERROR`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleToggle = async () => {
    try {
      let res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: { authorization: `Bearer ${token}` },
      });
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
      <div class="card-body items-center text-center flex flex-row justify-between">
        <h2 class="card-title">{props.task}</h2>
        <div class="card-actions flex flex-row justify-center items-center align-middle">
          <div className="h-6 w-6">
            <div className="tooltip" data-tip="Complete?">
              <input
                type="checkbox"
                checked={`${props.completed ? "checked" : ""}`}
                className="checkbox h-6 w-6"
                onClick={handleToggle}
              />
            </div>
          </div>

          <div>
            <button className="btn btn-square" onClick={handleDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
