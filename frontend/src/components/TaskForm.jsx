import React, { useState, useEffect } from "react";
import { createTask, updateTask } from "../api/api";

const TaskForm = ({ task, action, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(task ? task.priority : "medium");
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (task) {
      await updateTask(task.id, title, description, priority);
    } else {
      await createTask(title, description, priority);
    }
    setTitle("");
    setDescription("");
    setPriority("medium");
    onSubmit();
  };

  return (
    <div className="task-create">
      <h1>{action}</h1>
      <form>
        <div>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <br />
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="priority">Priority:</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" onClick={handleSubmit}>{action}</button>
      </form>
    </div>
  );
};

export default TaskForm;
