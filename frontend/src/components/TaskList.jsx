import React, { useState, useEffect } from "react";
import { getTasks } from "../api/api";
import TaskDetail from "./TaskDetail";
import { deleteTask } from "../api/api";
import TaskForm from "./TaskForm";



// NOTE pagination, filtering and ordering not implemented on the frontend
const TaskList = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null); // State to track selected task
  const fetchData = async () => {
    try {
      const result = await getTasks();
      setData(result.results);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    fetchData();
  };
  const handleUpdate = async () => {
    fetchData();
  };
  const handleCreate = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) return <div>loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <>
      <TaskForm action="Create Task" onSubmit={handleCreate} />
      <h1>task list</h1>
      {data && data.map((task, index) => (
        <div key={index} className="task-item">
          <h3>{task.title}</h3>
          <button className="details-button" onClick={() => setSelectedTask(task)}>View Details</button>
          {selectedTask === task && <TaskDetail
            task={selectedTask}
            onClose={() => setSelectedTask(null)}
            onDelete={() => handleDelete(task.id)}
            onUpdate={handleUpdate}
          />}
        </div>
      ))}
    </>
  )
}

export default TaskList;
