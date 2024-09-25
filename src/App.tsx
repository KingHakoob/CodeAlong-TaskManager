import { useEffect, useState } from "react"
import TaskListing from "./components/TaskListing";

export interface Task {
  id: number,
  task: string,
  isCompleted: boolean,
}

const lsKey = 'tasks';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(() => localStorage.getItem(lsKey) ? JSON.parse(localStorage.getItem(lsKey)!) : []);
  const [input, setInput] = useState('')

  const addTask = () => {
    setTasks([...tasks, { id: tasks.length == 0 ? 0 : tasks[tasks.length - 1].id + 1, task: input, isCompleted: false }]);
    setInput('');
  }

  useEffect(() => {
    localStorage.setItem(lsKey, JSON.stringify(tasks));
  }, [tasks])

  return (
    <>
      <h1 className="text-center">One File Task App</h1>

      <div className="container">
        <div className="row mb-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <div className="row">
          <button className="btn btn-primary" onClick={addTask}>Add Task</button>
        </div>
      </div>

      <hr />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Task</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>

          {
            tasks.map(task => (
              <TaskListing task={task} tasks={tasks} setTasks={setTasks} key={task.id} />
            ))
          }
        </tbody>
      </table>


    </>
  )
}

export default App