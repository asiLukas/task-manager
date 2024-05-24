import React, { useEffect } from "react";

const TaskDetail = ({ task, onClose, onDelete }) => {
  return (
    <div className="task-popup">
      <h2>Task Details</h2>
      <h3>Title: {task.title}</h3>
      <h4>Description: {task.description}</h4>
      <h4>Priority: {task.priority}</h4>
      <h4>Created: {task.created}</h4>
      <h4>Updated: {task.updated}</h4>
      <button style={{ fontSize: "16px", marginRight: "10px", backgroundColor: "#007bff", color: "#fff" }}>Update</button>
      <button style={{ fontSize: "16px" }} onClick={onClose}>Close</button>
      <button
        type="sumbit"
        style={{ fontSize: "16px", marginRight: "10px", backgroundColor: "red", color: "#fff" }}
        onClick={onDelete}>Delete</button>

    </div >
  );
}

export default TaskDetail;
