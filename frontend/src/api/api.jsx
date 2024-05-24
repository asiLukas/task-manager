import axios from "axios";
import { getTaskDetail, TASK_LIST, TASK_CREATE, BASE_URL } from "./endpoints";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
})
// NOTE auth is not implemented on the frontend
const username = "admin";
const password = "admin";


export const updateTask = async (id) => {
  try {
    const response = await api.put(getTaskDetail(id), {
      title: title,
      description: description,
      priority: priority,
    }, {
      headers: {
        "Authorization": `Basic ${btoa(username + ":" + password)}`
      }
    }
    );

    return response.data;
  } catch (error) {
    console.error("Error while updating the task!");
    throw error;
  }
}

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(getTaskDetail(id), {
      headers: {
        "Authorization": `Basic ${btoa(username + ":" + password)}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error while removing the task!");
    throw error;
  }
}

export const createTask = async (title, description, priority) => {
  try {
    const response = await api.post(TASK_CREATE, {
      title: title,
      description: description,
      priority: priority,
    }, {
      headers: {
        "Authorization": `Basic ${btoa(username + ":" + password)}`
      }
    }
    );
    return response.data;
  } catch (error) {
    console.error("Error while creating a task!");
    throw error;
  }
}

export const getTasks = async () => {
  try {
    const response = await api.get(TASK_LIST, {
      headers: {
        "Authorization": `Basic ${btoa(username + ":" + password)}`
      }
    })
    return response.data;
  } catch (error) {
    console.error("Error while fetching tasks!")
    throw error;
  }
}
