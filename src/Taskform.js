import React, { useState } from 'react';
import './Taskform.css';

function TaskForm({ task, onSave, onCancel, onDelete }) {
  const [taskData, setTaskData] = useState(task || { name: '', description: '', dueDate: '', priority: 'Low' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    if (onSave) {
      onSave(taskData); 
    } else {
      console.error("onSave is not defined");
    }
  };

  const handleMarkAsDone = () => {
    if (onSave) {
      onSave({ ...taskData, priority: 'Done' }); 
    }
  };

  return (
    <div className="task-form">
      <div className="task-form-header">
        <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
        {task && onDelete && (
          <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
        )}
      </div>

      <div className="task-form-body">
        <label>Task Name:</label>
        <input
          type="text"
          name="name"
          value={taskData.name}
          onChange={handleInputChange}
          placeholder="Enter task name"
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleInputChange}
          placeholder="Enter task description"
        />

        <label>Due Date:</label>
        <input
          type="datetime-local"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleInputChange}
        />

        <label>Priority:</label>
        <select
          name="priority"
          value={taskData.priority}
          onChange={handleInputChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          {!task && <option value="Done">Done</option>}
        </select>
      </div>

  <div className="task-form-footer">
    <button className="action-btn save-btn" onClick={handleSubmit}>Save Changes</button>
    {task && <button className="action-btn" onClick={handleMarkAsDone}>Mark as Done</button>}
    <button className="action-btn" onClick={onCancel}>Cancel</button>
  </div>



    </div>
  );
}

export default TaskForm;
