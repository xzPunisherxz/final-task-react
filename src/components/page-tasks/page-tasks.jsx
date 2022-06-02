import React, { useState } from "react";
import Filter from "../filter/filter";
import Tasks from "../tasks/tasks";
import { observer } from "mobx-react-lite";

const PageTasks = observer (({tasks, users}) => {   
    
    const [startStep, setStartStep] = useState(1);
    const [endStep, setEndStep] = useState(10)
    

    return (
        <section className="page-tasks">
            <Filter tasks={ tasks }/>
            <section className="board__list">
            {tasks.slice(startStep - 1, endStep).map(task => <Tasks {...task} key={task.id}
                            tasks={tasks}
                            users={users}
                        />)}
            </section>
        </section>       
    )
})

export default PageTasks;