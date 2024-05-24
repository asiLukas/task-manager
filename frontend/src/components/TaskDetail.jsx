import React, { useState } from "react";
import TaskForm from "./TaskForm";

const TaskDetail = ({ task, onClose, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const actionDelete = () => {
    onDelete(task.id);
    onClose();
  };

  const handleUpdate = () => {
    setIsEditing(true);
  };

  return (
    <div className="task-popup">
      {!isEditing ? (
        <>
          <h2>Task Details</h2>
          <h3>Title: {task.title}</h3>
          <h4>Description: {task.description}</h4>
          <h4>Priority: {task.priority}</h4>
          <h4>Created: {task.created}</h4>
          <h4>Updated: {task.updated}</h4>
          <button
            style={{ fontSize: "16px", marginRight: "10px", backgroundColor: "#007bff", color: "#fff" }}
            onClick={handleUpdate}
          >
            Update
          </button>
          <button style={{ fontSize: "16px" }} onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            style={{ fontSize: "16px", marginRight: "10px", backgroundColor: "red", color: "#fff" }}
            onClick={actionDelete}
          >
            Delete
          </button>
        </>
      ) : (
        <TaskForm
          action="Update Task"
          task={task}
          onSubmit={() => {
            setIsEditing(false);
            onUpdate();
          }}
        />
      )}
    </div>
  );
};

export default TaskDetail;
