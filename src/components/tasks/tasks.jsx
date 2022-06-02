import React, { useState } from "react";
import TasksStatus from "../tasks-status/tasks-status";
import { Link, useLocation } from "react-router-dom";
import { AppRoute } from "../../const";
import { observer } from "mobx-react-lite";
import TasksDropdown from "../tasks-dropdown/tasks-dropdown";
import TasksPriority from "../tasks-priority/tasks-priority";
import { tasks } from "../../store";


const Tasks = observer  (({tasksUser, id, assignedId, title, type, status, rank}) => {
  const { pathname } = useLocation();

  const assignedUserName = () => {
    if (pathname === AppRoute.TASKS && tasksUser.find(x => x.id === assignedId) === undefined) {
        return (tasks.mock.username)
    } else if (pathname === AppRoute.TASKS) {
        return (tasksUser.find(x => x.id === assignedId).username)
    }
}


  const [startStatus, setStartStatus] = useState(status)

  const props = { startStatus, setStartStatus, id }

  const tasksDropDownMenu = () => {
    if(pathname === AppRoute.TASKS) {
      return (
        <>
        <TasksDropdown props={props} />
        </>
      )
    }
  }


  const tasksType = () => {
    if(type === "task") {
      return (<img src="../images/Type.png" alt="type"/>)
    } else if(type === "bug") {
      return (<img src="../images/Bug.png" alt="bug"/>)
    }
  }
     
    return (        
      <div className="board__item">
                     <Link className="board__task-link" to={`${AppRoute.TASKS}/${id}`}>
                         <div className="board__task-type">{tasksType()}</div>
                         <div className="board__task-header"><p className="task-name-p">{title}</p></div>
                         <div className="board__task-user"><p className="task-user-name">{assignedUserName()}</p></div>
                         <div className="board__task-status"><TasksStatus status={startStatus}/></div>
                         <div className="board__task-rank"><TasksPriority rank={rank}/></div>  
                     </Link>  
                     {tasksDropDownMenu()}

      </div>                              
                 
    )
})

export default Tasks;
