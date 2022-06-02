import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import moment from "moment";
import { api } from "../../api";
import { action } from "mobx";
import ModalWindow from "../modal-window-task/modal-window-task";
import { tasks, users } from "../../store";


const PageTask = observer (() => {
    const [loggedUser, setLoggedUser] = useState([])

    if ((loggedUser.length === 0) && (localStorage.length > 0)) {
        setLoggedUser(JSON.parse(localStorage.getItem("loggedUserInfo")))
    }

    const { id } = useParams();

    let currentTask;

    if (tasks.data.find(x => x.id === id) === undefined) {
        currentTask = tasks.mock
    } else {
        currentTask = tasks.data.find(x => x.id === id)
    }

    let userAssigned;
    if (users.data.find(x => x.id === currentTask.assignedId) === undefined) {
        userAssigned = users.mock.username
    } else {
        userAssigned = users.data.find(x => x.id === currentTask.assignedId).username
    }

    let userAuthor
    if (users.data.find(x => x.id === currentTask.userId) === undefined) {
        userAuthor = users.mock.username
    } else {
        userAuthor = users.data.find(x => x.id === currentTask.userId).username
    }

    const taskType = () => {
        if (currentTask === "null" || currentTask === undefined || currentTask.type === 'task') {
            return 'Задача'
        } else {
            return 'Ошибка'
        }
    }

    const taskRank = () => {
        if (currentTask === "null" || currentTask === undefined || currentTask.rank === 'low') {
            return ("Низкий")
        } else if (currentTask.rank === 'medium') {
            return ("Средний")
        } if (currentTask.rank === 'high') {
            return ("Высокий")
        }
    }

    const dateOfCreation = () => {
        if (currentTask === "null" || currentTask === undefined) {
            return ("...")
        } else {
            return (moment(currentTask.dateOfCreation).format('DD.MM.YYYY HH:MM'))
        }
    }

    const dateOfUpdate = () => {
        if (currentTask === "null" || currentTask === undefined) {
            return ("...")
        } else {
            return (moment(currentTask.dateOfUpdate).format('DD.MM.YYYY HH:MM'))
        }
    }

    const taskTime = () => {
        if (currentTask === "null" || currentTask === undefined) {
            return (0)
        } else {
            let min = currentTask.timeInMinutes;
            let hour = min / 60;
            let decCache = [],
                decCases = [2, 0, 1, 1, 1, 2];

            function decOfNum(number, titles) {
                if (!decCache[number])
                    decCache[number] =
                        number % 100 > 4 && number % 100 < 20
                            ? 2
                            : decCases[Math.min(number % 10, 5)];
                return titles[decCache[number]];
            }

            let fullTime =
                Math.floor(hour / 24) +
                " " +
                decOfNum(Math.floor(hour / 24), ["день", "дня", "дней"]) +
                " " +
                Math.floor(hour % 24) +
                " " +
                decOfNum(Math.floor(hour % 24), ["час", "часа", "часов"]) +
                " " +
                Math.floor(min % 60) +
                " " +
                decOfNum(Math.floor(min % 60), ["минута", "минуты", "минут"]);
            return (fullTime)
        }
    }

    const description = () => {
        if (currentTask === "null" || currentTask === undefined) {
            return ("...")
        } else {
            return (currentTask.description)
        }
    }

    const [isModal, setModal] = useState(false);

    const [commentForm, setCommentForm] = useState({
        taskId: id,
        userId: JSON.parse(localStorage.getItem("loggedUserInfo")).id,
        text: null,
        dateOfCreation: new Date(),
        dateOfUpdate: new Date()
    });
    const handleFieldChange = action((evt) => {
        const { name, value } = evt.target;
        setCommentForm({ ...commentForm, [name]: value })
        
    })

    async function handleSubmit(e) {
        e.preventDefault();
        await api.addComments(
            {
                "taskId": commentForm.taskId,
                "userId": commentForm.userId,
                "text": commentForm.text,
                "dateOfCreation": commentForm.dateOfCreation,
                "dateOfUpdate": commentForm.dateOfUpdate,
            }
        );
        await api.getComments(id).then((data) => setComments(data));
    }

    const [comments, setComments] = useState([])

    useEffect(() => {
        api.getComments(id).then((data) => setComments(data))
    }, [id]);

    async function handelDeletComment(e) {
        await api.deleteComment(e.target.value);
        await api.getComments(id).then((data) => setComments(data));
        
    }


    return (
        <>
        <div className="page-task">
                <div className="task-info">
                    <div className="task-info-content">
                        <label className="task-info-content__l">Исполнитель</label>
                        <p className="task-info-content__p">{userAssigned}</p>
                    </div>
                    <div className="task-info-content">
                        <label className="task-info-content__l">Автор задачи</label>
                        <p className="task-info-content__p">{userAuthor}</p>
                    </div>
                    <div className="task-info-content">
                        <label className="task-info-content__l">Тип запроса</label>
                        <p className="task-info-content__p">{taskType()}</p>
                    </div>
                    <div className="task-info-content">
                        <label className="task-info-content__l">Приоритет</label>
                        <p className="task-info-content__p">{taskRank()}</p>
                    </div>
                    <div className="task-info-content">
                        <label className="task-info-content__l">Дата создания</label>
                        <p className="task-info-content__p">{dateOfCreation()}</p>
                    </div>
                    <div className="task-info-content">
                        <label className="task-info-content__l">Дата изменения</label>
                        <p className="task-info-content__p">{dateOfUpdate()}</p>
                    </div>
                    <div className="task-info-content">
                        <label className="task-info-content__l">Затрачено времени</label>
                        <p className="task-info-content__p">{taskTime()}</p>
                    </div>
                    <button className="btn-primary btn btn-task" onClick={() => setModal(true)}>Сделать запись о работе</button>
                </div>
                <div className="task-description">
                    <label className="task-description__l">Описание</label>
                    <p className="task-description__p">{description()}</p>
                </div>
                <div className="task-comment">
                    <form className="task-form" method="post">
                        <label className="task-form__l" 
                        htmlFor="comment">Комментарий({comments.length})
                        </label>
                        <textarea onChange={handleFieldChange} 
                        id="text" 
                        name="text" 
                        type="text" 
                        className="form-comment" 
                        placeholder="Текст комментария"
                        required>
                            {commentForm.text}
                        </textarea>
                        <button onClick={handleSubmit} 
                        className="btn-sucsess btn-form" 
                        type="submit">Добавить комментарий
                        </button>
                    </form>
                    <div className="task-comment__com">
                    {comments.map((comment) => {
                            return (
                                <div className="card__comment  comment" key={comment.id}>
                                    <div className="comment__title">
                                        <p className="comment__user-name">
                                            {(((users.data.find(x => x.id === comment.userId) !== undefined) 
                                            && users.data.find(x => x.id === comment.userId).username)) || ("не указан")}
                                         ({moment(comment.dateOfUpdate).format('DD.MM.YYYY HH:MM')})</p>

                                        {loggedUser.id === comment.userId &&
                                            <button
                                                onClick={handelDeletComment}
                                                type="button"
                                                className="btn__comment  btn-link  btn  currentUser"
                                                value={comment.id}
                                            >Удалить</button>}

                                    </div>
                                    <p className="comment__text">{comment.text}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
        </div>
        <ModalWindow
        isVisible={isModal}
        onClose={() => setModal(false)}
        tasks={tasks}
        setComments={setComments}
        />
        </>    
    )
})

export default PageTask;


