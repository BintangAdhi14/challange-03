import React, { useState } from "react";


const TodoItem = ({ todo, setRefresh }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const updateTodo = () => {
    todo.complete = !todo.complete

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todo)
    }).then(() => {
      console.log('todo updated.')
      setRefresh(true)
    })
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEditCancel = () => {
    setEditedTask(todo.task);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditedTask(e.target.value);
  };

  const saveEdit = () => {
    // Kirim permintaan PUT untuk mengubah tugas
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todo, task: editedTask }),
    })
      .then(() => {
        console.log("todo updated.");
        setRefresh(true);
        setIsEditing(false); // Keluar dari mode edit setelah menyimpan perubahan
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const deleteTodo = () => {
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    })
      .then(() => {
        console.log("todo deleted.");
        setRefresh(true);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <li onClick={updateTodo} className={`${todo.complete ? "checked" : ""}`}>
      {isEditing ? (
        // Tampilan saat mode edit aktif
        <>
          <input
            type="text"
            value={editedTask}
            onChange={handleInputChange}
          />
          <button className="save" onClick={saveEdit}>Save</button>
          <button onClick={handleEditCancel}>Cancel</button>
        </>
      ) : (
        // Tampilan saat tidak dalam mode edit
        <>
          <div>{todo.task}</div>
          <div class = "grid-container">
            <button  onClick={toggleEdit} i class="fa-solid fa-pencil" ></button>
            </div>
        </>
      )}
      <div class = "grid-container">
      <span className="close" onClick={deleteTodo}>x</span>
    </div>
    </li>
  );
};

export default TodoItem;