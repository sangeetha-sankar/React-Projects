// App.jsx
import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import './App.css';

const FILTERS = {
  All: () => true,
  Completed: task => task.completed,
  Pending: task => !task.completed,
};

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskInput onAdd={addTask} />
      <FilterBar current={filter} onChange={setFilter} />
      <TaskList
        tasks={tasks.filter(FILTERS[filter])}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default App;







