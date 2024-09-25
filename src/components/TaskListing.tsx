import { Task } from "../App"

interface Props {
    task: Task,
    tasks: Task[],
    setTasks: (tasks: Task[]) => void
}

const TaskListing = ({ task, tasks, setTasks }: Props) => {

    const editTask = (id: number, input: string) => {
        setTasks(tasks.map(task => task.id == id ? { ...task, task: input } : task));
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id != id));
    }

    const handleTaskCompletion = (id: number) => {
        setTasks(tasks.map(task => task.id == id ? { ...task, isCompleted: !task.isCompleted } : task));
    }


    return (
        <tr key={task.id}>
            <th scope="row">{task.id}</th>
            <td>
                <div className="input-group">
                    <div className="input-group-text">
                        <input className="form-check-input mt-0" type="checkbox" checked={task.isCompleted} aria-label="Checkbox for following text input" onChange={() => handleTaskCompletion(task.id)} />
                    </div>
                    <input type="text" className="form-control" style={{ textDecoration: task.isCompleted ? "line-through" : "none", color: task.isCompleted ? "gray" : "black" }} aria-label="Text input with checkbox" value={task.task} onChange={(e) => editTask(task.id, e.target.value)} />
                </div>
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteTask(task.id)}>Delete</button>
            </td>
        </tr>
    )
}

export default TaskListing