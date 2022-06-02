import React, { useState } from "react";
import BottomPanel from "../bottom-panel/bottom-panel";
import { Link, useParams } from "react-router-dom";
import { AppRoute } from "../../const";
import ModalWindow from "../modal-window-task/modal-window-task";
import { observer } from "mobx-react-lite";
import { tasks, users } from "../../store";
import Tasks from "../tasks/tasks";


const PageUser = observer (() => {

    const { id } = useParams();
    const [loggedUser, setLoggedUser] = useState([])
    if ((loggedUser.length === 0) && (localStorage.length > 0)) {
        setLoggedUser(JSON.parse(localStorage.getItem("loggedUserInfo")));
    }

    let currentUser;

    if (users.data.find(x => x.id === id) === undefined) {
        currentUser = tasks.mock
    } else {
        currentUser = users.data.find(x => x.id === id);
    }

    const [startStep, setStartStep] = useState(1)
    const [endStep, setEndStep] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const arrayLength = tasks.currentUserTasks.filter(x => x.assignedId === id).length
    
    const [isModal, setIsModal] = useState(false);

    const props = {
        arrayLength,
        startStep,
        setStartStep,
        endStep,
        setEndStep,
        currentPage,
        setCurrentPage
    }

    const setDefaulUserPic = () => {
        if ((currentUser.photoUrl === null) || currentUser.photoUrl === undefined) {
            return ("../images/defualt-user-icon.png")
        } else {
            return (currentUser.photoUrl)
        }
    }

    return (
        <>
          <div className="board__header">

           <h2 className="board__header-title  user-title">{currentUser.username}</h2>
           <div className="board__header-btns">
              <Link to={`${AppRoute.USERS}/${id}/add`}
                className="btn-board__header  btn">
                Добавить задачу
              </Link>
              <button
                onClick={() => setIsModal(true)}
                className="btn-board__header  btn-primary  btn"
                disabled={loggedUser.id === undefined || loggedUser.id !== id}
                >Редактировать
              </button>
           </div>
          </div>

          <section className="board__content">

          <div className="card__wrap">
             <div className="card__col  col-1">
               <div className="card__user-img-wrapper  ">
                 <img className="card__user-img" src={setDefaulUserPic()} width="186" height="186" alt="Изображение профиля" />
               </div>
               <h4 className="card__title">О себе</h4>
               <p className="card__title">{currentUser.about}</p>
             </div>
             <div className="card__col  col-2">
                 <p className="card__title">Задачи</p>
                 <div className="board__list">
                 {tasks.currentUserTasks.filter(x => x.assignedId === id).slice(startStep - 1, endStep).map(task => <Tasks {...task} key={task.id}
                  tasks={tasks}
                  users={users}
                  />)}
                 </div>
                 <BottomPanel props={props} />
             </div>

           </div>

          </section>
            <ModalWindow
             isVisible={isModal}
             title="Редактирование пользователя"
             onClose={() => setIsModal(false)}
             loggedUser={loggedUser}
             users={users}
             tasks={tasks.data}/>
        </>
    )
})

export default PageUser;



