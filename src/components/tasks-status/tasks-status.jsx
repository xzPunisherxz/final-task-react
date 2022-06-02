import React from "react";
import { observer } from "mobx-react-lite"

const TasksStatus = observer (({status}) => {
    if(status === "opened") {
        return ( 
        <div className="task-status-div open">Открыто</div>
        )
    }
    else if(status === "inProgress") {
        return (
        <div className="task-status-div in-work">В работе</div>
        )
    }
    else if(status === "complete") {
        return (
        <div className="task-status-div done">Открыто</div>
        )
    }
    else if(status === "testing") {
        return (
        <div className="task-status-div in-work">Открыто</div>
        )
    }
})

export default TasksStatus;