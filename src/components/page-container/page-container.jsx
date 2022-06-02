import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import BottomPanel from "../bottom-panel/bottom-panel";
import { AppRoute } from "../../const";
import { observer } from "mobx-react-lite";
import Filter from "../filter/filter";
import Tasks from "../tasks/tasks";
import UsersItem from "../users-item/users-item";

const PageContainer = observer (({ tasks, users }) => {
    const { pathname } = useLocation();
    
    const [startStep, setStartStep] = useState(1)
    const [endStep, setEndStep] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const arrayLength = tasks.length;
    
    const props = {
        arrayLength,
        startStep,
        setStartStep,
        endStep,
        setEndStep,
        currentPage,
        setCurrentPage
    }



    if (pathname === AppRoute.USERS) {
        return (
            <>
            <section className="top-panel">
              <div className="title">
                <h2 className="title-task">Пользователи</h2>
              </div>
            </section>
            <section className="page-container">
             <div className="page-users">               
                      {users.slice(startStep -1, endStep).map(user => <UsersItem {...user} key={user.id} />)}              
                 </div>
            <BottomPanel props={ props }/>
            </section>
            </>
        )
    } else if (pathname === AppRoute.TASKS) {
        return (
            <>
            <section className="top-panel">
                     <div className="title">
                         <h2 className="title-task">Задачи</h2>
                     </div>
                     <div className="buttons">
                         <Link to={AppRoute.ADD} className="btn-primary btn" >Добавить задачу</Link>
                     </div>
            </section>
            <section className="page-container">
              <section className="page-tasks">
              <Filter tasks={ tasks }/>
                <section className="tasks">
                {tasks.slice(startStep - 1, endStep).map(task => <Tasks {...task} key={task.id}
                            tasks={tasks}
                            tasksUser={users}
                        />)}
            </section>
             </section>
                <BottomPanel props={ props }/>
            </section>
            </>
        )
    }   
})

export default PageContainer;