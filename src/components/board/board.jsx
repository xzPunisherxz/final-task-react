import React from "react";
import PageContainer from "../page-container/page-container";
import PageTask from "../page-task/page-task";
import PageUser from "../page-user/page-user";
import { AppRoute } from "../../const";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import { action } from "mobx";
import AddEditTask from "../add-edit-task/add-edit-task";
import TasksStatus from "../tasks-status/tasks-status";
import { observer } from "mobx-react-lite";
import { users, tasks } from "../../store/index";
import StatusButton from "../status-button/status-button";

const Board = observer (() => {
    
    const { pathname } = useLocation();
    const { id } = useParams();
    const { userid } = useParams();
    const history = useHistory();

    if (pathname === AppRoute.TASKS) {
        return (
            <section className="board">
               <PageContainer tasks={tasks.data} users={users.data}/> 
            </section>
        )
    }

      else if (pathname === `${AppRoute.TASKS}/${id}`) {
        
        let currentTask;
        if (tasks.data.find(task => task.id === id) === undefined) {
            currentTask = tasks.mock
        } else {
            currentTask = tasks.data.find(task => task.id === id)
        }

        const handleDelete = action(() => {
            tasks.deleteTask(id);
            history.goBack();
        })
       
        
    return (
        <section className="board">
            <section className="top-panel">
                     <div className="title">
                         <h2 className="title-task">{currentTask.title}</h2>
                         <TasksStatus status={currentTask.status}/>
                     </div>
                     <div className="buttons">
                         <StatusButton id={id}/>
                         <Link to={`/edit/${id}`} className="btn-primary btn ">Редактировать</Link>
                         <button type="submit" onClick={() => { handleDelete()}}
                         className="btn-error btn ">Удалить
                         </button>
                         
                     </div>
            </section>
            <PageTask tasks={ tasks.data } users={ users.data }/>
        </section>
    )
    } 
    else if(pathname === AppRoute.USERS) {
        
        return (
            <section className="board">
               <PageContainer tasks={tasks.data} users={users.data}/>
                
            </section>
        )
    }
    
    else if (pathname === `${AppRoute.USERS}/${id}`) {
        
        return (
            <>
            <section className="board">
                <PageUser tasks={ tasks.data } users={ users.data } />
            </section>
            </>
        )
    }
    else if (pathname === `${AppRoute.ADD}/${id}`) {

        const currentTask = tasks.data.find(task => task.id === id)
        const currentUser = users.data.find(user => user.id === userid)
        

        if (currentTask || currentUser) {
            return (
                <>
                    <section className="board">
                        <AddEditTask currentTask={currentTask} currentUser={currentUser} userId={userid} />
                    </section>
                </>
            )
        }
    }
 
    else if (pathname === AppRoute.ADD || pathname === `${AppRoute.USERS}/${userid}/add`) {
       
        return (
            <>
            <section className="board">
                
                <AddEditTask userId={userid}/>
            </section>
            </>
        )
    }
})

export default Board;