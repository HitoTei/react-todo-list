import React, {useState} from 'react';
import './App.css';

function App() {
    const [taskList, setTaskList] = useState<Task[]>([])
    return (
        <div className="App">
            <button onClick={() => {
                    setTaskList([...taskList, {name: "Task" + taskList.length, checked: false}])
            }}>
                Add task: {taskList.length}
            </button>
            <TaskList
                taskList={taskList}
                onCheckedChange={(index: number) => {
                    const newTaskList = taskList.map((task, taskIndex) => {
                        if (index === taskIndex){
                            task.checked = !task.checked
                        }
                        return task
                    })
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
    onCheckedChange: (index: number) => void
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
            />
        )}
    </div>

}

function TaskTile({
                      taskName = "",
                      checked = false,
                      onChange = () => {
                      }
                  }) {
    return <div className="TaskTile">
        <input
            className="TaskTileCheckBox"
            type="checkbox"
            checked={checked}
            onChange={onChange}
        />
        {taskName}
    </div>
}

export default App;
