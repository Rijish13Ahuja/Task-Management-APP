import './TaskList.css';
import React, { useState } from 'react';

function TaskList({ tasks, onFilterChange, onEditTask, onDeleteTask, onAddNewTask }) {
  const [expandedTasks, setExpandedTasks] = useState({}); 
  const [isDarkMode, setIsDarkMode] = useState(false); 

  const handleToggle = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId], 
    }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`task-list ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="header">
        <h1>Task List View</h1>
        <label className="switch">
          <input type="checkbox" onChange={toggleDarkMode} checked={isDarkMode} />
          <span className="slider round"></span>
        </label>
      </div>

      <button className="add-task-btn" onClick={onAddNewTask}>+ Add New Task</button>

      <div className="task-filters">
        <button onClick={() => onFilterChange('All')}>All</button>
        <button onClick={() => onFilterChange('High')}>High</button>
        <button onClick={() => onFilterChange('Medium')}>Medium</button>
        <button onClick={() => onFilterChange('Low')}>Low</button>
        <button onClick={() => onFilterChange('Done')}>Done</button>
      </div>

    
      {tasks.map(task => (
        <div key={task.id} className="task-item">
          <div className="task-header" onClick={() => handleToggle(task.id)}>
            <h2>{task.name}</h2>
            <span className={`priority-dot ${task.priority.toLowerCase()}`}></span>
            <button className="expand-toggle">
              {expandedTasks[task.id] ? '▼' : '▶'} 
            </button>
          </div>
          {expandedTasks[task.id] && (
    <div className="task-details">
        <p>Due Date: <span className="due-date">{task.dueDate}</span></p>
        <p>Priority: <span className="priority">{task.priority}</span></p>
        <button className="edit-btn" onClick={() => onEditTask(task)}>Edit</button>
      <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>Delete</button>
    </div>
      )}

        </div>
      ))}
    </div>
  );
}

export default TaskList;
