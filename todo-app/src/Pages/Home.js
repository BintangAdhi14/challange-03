import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [task, setTask] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const addTodo = () => {
    const newTodo = {task, complete: false}
    // const addTodo = () => {
    //   const newTodo = { task, complete: false };
  
      fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      }).then(() => {
        // ketika sukses menambah data, reset form dengan mengeset state task menjadi empty string
        setTask('');
      });
    
  
    

    // Kemudian, setelah menambah tugas, tampilkan notifikasi selama 2 detik
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);

    // Kemudian, reset input
    setTask('');
  };

  return (
    <div className="header">
      <h2>TodoList</h2>
      <div className='grid-container'>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add Todo..."
      />
      <span
        className="add-button"
        onClick={() => {
          addTodo();
        }}
      >
        Add
      </span>
      {showNotification && (
        <div className="notification">
          Item berhasil ditambahkan!
        </div>
      )}
      <Link to="/">
        <span className="add-back">Back to Home</span>
      </Link>
      </div>
    </div>
  );
};

export default Header;
