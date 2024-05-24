import { useState } from 'react'
import './App.css'
import TaskList from "./components/TaskList"
import TaskForm from './components/TaskForm'

function App() {

  return (
    <>
      <h1>hello</h1>
      <TaskForm action="Create Task" />
      <TaskList />
    </>
  )
}

export default App
