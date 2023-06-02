import React, {useState} from 'react';
import './App.css';

function App() {
    const [taskList, setTaskList] = useState<Task[]>([])
    const [taskName, setTaskName] = useState("")
    return (
        <div className="App">
            <input
                type="text"
                value={taskName}
                onChange={(event) => setTaskName(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter" && taskName !== "") {
                        setTaskName("")
                        setTaskList([...taskList, {name: taskName, checked: false}])
                    }
                }}
                placeholder="タスク名"
            />
            <TaskList
                taskList={taskList}
                onCheckedChange={(index: number) => {
                    const newTaskList = taskList.map((task, taskIndex) => {
                        if (index === taskIndex) {
                            task.checked = !task.checked
                        }
                        return task
                    })
                    setTaskList(newTaskList)
                }}
                onRemoveTask={(index: number) => {
                    const newTaskList = taskList.filter((task, taskIndex) => taskIndex !== index)
                    setTaskList(newTaskList)
                }}
            />
        </div>
    );
}

interface Task {
    name: string,
    checked: boolean
}

type TaskListProps = {
    taskList: Task[],
    onCheckedChange: (index: number) => void,
    onRemoveTask: (index: number) => void
}

function TaskList(
    props: TaskListProps
) {

    return <div className="TaskList">
        {props.taskList.map((task, index) =>
            <TaskTile
                taskName={task.name}
                checked={task.checked}
                onChange={() => props.onCheckedChange(index)}
                onRemove={() => props.onRemoveTask(index)}
            />
        )}
    </div>

}

type TaskTileProps = {
    taskName: string,
    checked: boolean,
    onChange: () => void,
    onRemove: () => void
}

function TaskTile(props: TaskTileProps) {
    return <div className="TaskTile">
        <input
            className="TaskTileCheckBox"
            type="checkbox"
            checked={props.checked}
            onChange={props.onChange}
        />
        {props.taskName}
        <button onClick={props.onRemove}>
            削除
        </button>
    </div>
}

export default App;
