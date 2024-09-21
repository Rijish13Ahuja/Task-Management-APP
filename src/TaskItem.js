import React, { useState } from 'react';

function TaskItem({ task, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="task-item">
      <div className="task-header">
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? '▼' : '▶'}
        </button>
        <span className="task-name">{task.name}</span>
        <span className="task-priority">
          {task.priority} <span className={`priority-dot ${task.priority.toLowerCase()}`}></span>
        </span>
        <span className="task-due-date">{task.dueDate}</span>
      </div>
      {expanded && (
        <div className="task-actions">
          <button onClick={() => onEdit(task)}>Edit</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
