'use client'
import { useState, useEffect } from 'react';
import './styles.css';
import './bootstrap-custom.css';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);
        setTasks(data.map(task => ({ text: task, selected: false })));
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() === '') {
      return;
    }

    const updatedTasks = [...tasks, { text: newTask, selected: false }];
    console.log('New task added:', newTask);
    setTasks(updatedTasks);
    setNewTask('');
  };

  const handleTaskClick = (taskIndex) => {
    console.log('Task clicked:', taskIndex);
    if (selectedTask === taskIndex) {
      setSelectedTask(null);
    } else {
      setSelectedTask(taskIndex);
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask !== null) {
      const updatedTasks = tasks.filter((_, index) => index !== selectedTask);
      console.log('Task deleted:', tasks[selectedTask]);
      setTasks(updatedTasks);
      setSelectedTask(null);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Ma liste de tâches :</h1>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${selectedTask === index ? 'selected' : ''}`}
            onClick={() => handleTaskClick(index)}
          >
            {task.text}
            {selectedTask === index && (
              <button className="delete-button" onClick={handleDeleteTask}>
                Supprimer
              </button>
            )}
          </li>
        ))}
      </ul>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={handleInputChange}
          className="task-input"
        />
        <button type="submit" className="submit-button">Ajouter</button>
      </form>
    </div>
  );
}
