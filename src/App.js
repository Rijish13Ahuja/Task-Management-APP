import React, { useState, useEffect, useCallback } from 'react';
import TaskList from './TaskList';
import TaskForm from './Taskform';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', description: 'Lorem Ipsum...', dueDate: '2024-08-17T18:30', priority: 'High' },
    { id: 2, name: 'Task 2', description: 'Lorem Ipsum...', dueDate: '2024-07-25T18:30', priority: 'Medium' },
    { id: 3, name: 'Task 3', description: 'Lorem Ipsum...', dueDate: '2024-08-01T18:30', priority: 'Low' }
  ]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isTaskFormVisible, setTaskFormVisible] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
      setFilteredTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleSaveTask = useCallback((taskData) => {
    if (currentTask) {
      setTasks(prevTasks => prevTasks.map(t => t.id === currentTask.id ? { ...t, ...taskData } : t));
    } else {
      setTasks(prevTasks => [...prevTasks, { ...taskData, id: Date.now() }]);
    }
    setTaskFormVisible(false);
    setCurrentTask(null);
  }, [currentTask]);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));
    setTaskFormVisible(false);
    setCurrentTask(null);
  }, []);

  const handleEditTask = useCallback((task) => {
    setCurrentTask(task);
    setTaskFormVisible(true);
  }, []);

  const handleAddNewTask = useCallback(() => {
    setCurrentTask(null);
    setTaskFormVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setTaskFormVisible(false);
    setCurrentTask(null);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    if (filter === 'All') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.priority === filter));
    }
  }, [tasks]);

  return (
    <div className="app">
      {!isTaskFormVisible ? (
        <TaskList
          tasks={filteredTasks}
          onFilterChange={handleFilterChange}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
          onAddNewTask={handleAddNewTask}
        />
      ) : (
        <TaskForm
          task={currentTask}
          onSave={handleSaveTask}
          onCancel={handleCancel}
          onDelete={currentTask ? () => handleDeleteTask(currentTask.id) : null}
        />
      )}
    </div>
  );
}

export default App;
