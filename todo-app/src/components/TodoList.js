import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Search from "./Search"; // Impor komponen Search

const TodoList = ({ isRefresh, setRefresh }) => {
  // State untuk menyimpan daftar tugas, filter, dan kata kunci pencarian
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Mengambil data tugas dari server saat komponen dimuat ulang (isRefresh berubah)
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => {
          return res.json()})
        .then((data) => {
          setRefresh(false);
          setTodos(data);
          setFilter("all");
        })

        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        }); 
    }
  }, [isRefresh, setRefresh]);

  // Fungsi untuk mengubah filter yang digunakan
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Fungsi untuk mengubah kata kunci pencarian
  const handleSearchTermChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  // Memfilter tugas berdasarkan filter dan kata kunci pencarian
  const filteredTodos = todos.filter((todo) => {
    if (!todo.task) {
      return false;
    }

    if (filter === "all") {
      return true;
    } else if (filter === "complete") {
      return todo.complete;
    } else if (filter === "uncomplete") {
      return !todo.complete;
    }

    return true;
  });

  return (
    <div className="todo-list">
      {/* Menampilkan komponen Search untuk input pencarian */}
      <Search searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange("all")}>All</button>
        <button onClick={() => handleFilterChange("complete")}>complete</button>
        <button onClick={() => handleFilterChange("uncomplete")}>Todo</button>
      </div>
      <ul>
        {/* Merender daftar tugas yang telah difilter berdasarkan filter dan kata kunci pencarian */}
        {filteredTodos
          .filter((todo) =>
            todo.task.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((todo) => (
            <TodoItem key={todo.id} todo={todo} setRefresh={setRefresh} />
          ))}
      </ul>
    </div>
  );
};

export default TodoList;
