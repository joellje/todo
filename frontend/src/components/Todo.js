import React from "react";

export default function Todo(props) {
  const id = props.id;
  const handleDelete = async () => {
    try {
      let res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      let result = await res.json();
      if (res.status === 200) {
        console.log(`deleting ${result}`);
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
      });
      let result = await res.json();
      if (res.status === 200) {
        console.log(`updating ${result}`);
      } else {
        alert(`ERROR`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`max-w-sm rounded overflow-hidden border-2 ${
        props.completed ? "line-through" : ""
      }`}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.task}</div>
      </div>
      <div className="px-6">
        <button className="text-xl mb-2 border-2" onClick={handleDelete}>
          Delete
        </button>
        <button className="text-xl mb-2 border-2" onClick={handleComplete}>
          Complete?
        </button>
      </div>
    </div>
  );
}
