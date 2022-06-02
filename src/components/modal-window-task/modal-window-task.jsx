import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useParams } from "react-router-dom";
import { AppRoute } from "../../const";
import { api } from "../../api";
import { action, runInAction } from "mobx";
import { users, tasks } from "../../store/index";


const ModalWindow = observer (({ isVisible = false, onClose, setComments }) => {
    const { pathname } = useLocation();
    const { id } = useParams();

    let currentUser;
    

    if (pathname === `${AppRoute.USERS}/${id}` && users.data.find(x => x.id === id) === undefined) {
        currentUser = tasks.mock
    } else {
        currentUser = users.data.find(x => x.id === id)
    }

    
    const [userForm, setUserForm] = useState({
        username: (pathname === `${AppRoute.USERS}/${id}` && currentUser.username),
        about: (pathname === `${AppRoute.USERS}/${id}` && currentUser.about),
        photoUrl: (pathname === `${AppRoute.USERS}/${id}` && currentUser.photoUrl),

    })

    
    const [timeForm, setTimeForm] = useState({
        timeInMinutes: (pathname === `${AppRoute.TASKS}/${id}` && ""),
        timeUnit: (pathname === `${AppRoute.TASKS}/${id}` && "minute"),
        comment: (pathname === `${AppRoute.TASKS}/${id}` && ""),
        currentUser: users.loggedUser.id
    })

    const handleFieldChange = action((e) => {
        if (pathname === `${AppRoute.USERS}/${id}`) {
            const { name, value } = e.target;
            setUserForm({ ...userForm, [name]: value })
        }
        else if (pathname === `${AppRoute.TASKS}/${id}`) {
            const { name, value } = e.target;
            setTimeForm({ ...timeForm, [name]: value })
        }
    })

    async function handleSubmit(e) {
        e.preventDefault()
        if (pathname === `${AppRoute.USERS}/${id}`) {
            runInAction(() => {
                users.editUser({
                    "id": users.loggedUser.id,
                    "login": users.loggedUser.login,
                    "username": userForm.username,
                    "about": userForm.about,
                    "photoUrl": `${userForm.photoUrl}`,
                    "password": JSON.parse(localStorage.getItem("userPassword"))
                });
                users.loggedUser.username = userForm.username;
                users.loggedUser.photoUrl = `${userForm.photoUrl}`;
                users.loggedUser.about = userForm.about;
            })
            onClose();
        }
        
        else if (pathname === `${AppRoute.TASKS}/${id}`) {
            if (timeForm.timeUnit === "minute") {
                await tasks.addWorktime(id, {
                    "timeInMinutes": timeForm.timeInMinutes,
                    "comment": timeForm.comment,
                    "currentUser": users.loggedUser.id
                });
            } else if (timeForm.timeUnit === "hour") {
                await tasks.addWorktime(id, {
                    "timeInMinutes": timeForm.timeInMinutes * 60,
                    "comment": timeForm.comment,
                    "currentUser": users.loggedUser.id
                });
            } else if (timeForm.timeUnit === "day") {
                await tasks.addWorktime(id, {
                    "timeInMinutes": timeForm.timeInMinutes * 60 * 24,
                    "comment": timeForm.comment,
                    "currentUser": users.loggedUser.id
                });
            }
            await api.getComments(id).then((data) => setComments(data));
            onClose()
        }
    }

    if (isVisible && pathname === `${AppRoute.USERS}/${id}` && users.loggedUser.id) {
        return (
            <>
                <div className="modal" onClick={onClose}>
                    <div className="modal__dialog"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal__header">
                            <h3 className="modal__title">Редактирование пользователя</h3>
                        </div>
                        <div className="modal__body">
                            <div className="modal__content">
                                <form
                                    className="modal__field  field"
                                    id="user-edit-form"
                                    onSubmit={handleSubmit}>
                                    <label
                                        htmlFor="username"
                                        className="label__modal  label"
                                    >Имя пользователя
                                    </label>
                                    <textarea
                                        typeof="text"
                                        onChange={handleFieldChange}
                                        className="input__modal  input__title  input"
                                        name="username"
                                        placeholder=""
                                        defaultValue={userForm.username}
                                        required
                                    ></textarea>
                                    <label
                                        htmlFor="urlpicture"
                                        className="label__modal  label"
                                    >URL фотографии
                                    </label>
                                    <input
                                        typeof="url"
                                        onChange={handleFieldChange}
                                        className="input__modal  input__title  input"
                                        name="photoUrl"
                                        placeholder=""
                                        defaultValue={userForm.photoUrl}
                                        required
                                    ></input>

                                    <label
                                        htmlFor="status"
                                        className="label__modal  label"
                                    >О себе
                                    </label>
                                    <textarea
                                        typeof="text"
                                        onChange={handleFieldChange}
                                        className="input__modal-comment  input"
                                        name="about"
                                        placeholder="Расскажите о себе"
                                        defaultValue={userForm.about}
                                    ></textarea>
                                </form>
                            </div>
                        </div>
                        <div className="modal__footer">
                            <div className="modal__footer-buttnos">
                                <button
                                    typeof="submit"
                                    className="btn-board__header  btn-primary  btn"
                                    form="user-edit-form">
                                    Добавить
                                </button>
                                <button
                                    className="btn-board__header  btn"
                                    onClick={onClose}
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else if (isVisible && pathname === `${AppRoute.TASKS}/${id}`) {
        return (
            <>
                <div className="modal" onClick={onClose}>
                    <div className="modal__dialog"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal__header">
                            <h3 className="modal__title">Запись о работе</h3>
                        </div>
                        <div className="modal__body">
                            <div className="modal__content">
                                <form
                                    className="modal__field  field"
                                    id="add-work-time-form"
                                    onSubmit={handleSubmit}
                                >
                                    <label
                                        htmlFor="timeInMinutes"
                                        className="label__modal  label"
                                    >Затраченное время
                                    </label>
                                    <textarea
                                        typeof="text"
                                        onChange={handleFieldChange}
                                        className="input__modal  input__title  input"
                                        name="timeInMinutes"
                                        placeholder="Введите количество затраченного времени"
                                        defaultValue={timeForm.timeInMinutes}
                                        required
                                    ></textarea>

                                    <label
                                        htmlFor="timeUnit"
                                        className="label__modal  label"
                                    >Единица измерения
                                    </label>
                                    <select
                                        className="modal__select  select"
                                        onChange={handleFieldChange}
                                        name="timeUnit"
                                        defaultValue={timeForm.timeUnit}
                                    >
                                        <option
                                            value="minute"
                                            defaultChecked
                                        >Минуты</option>
                                        <option
                                            value="hour"
                                        >Часы</option>
                                        <option
                                            value="day"
                                        >Дни</option>
                                    </select>

                                    <label
                                        htmlFor="status"
                                        className="label__modal  label"
                                    >Комментарий
                                    </label>
                                    <textarea
                                        typeof="text"
                                        onChange={handleFieldChange}
                                        className="input__modal-comment  input"
                                        name="comment"
                                        placeholder="Добавьте комментарий"
                                        defaultValue={timeForm.comment}
                                    ></textarea>
                                </form>
                            </div>
                        </div>
                        <div className="modal__footer">
                            <div className="modal__footer-buttnos">
                                <button
                                    form="add-work-time-form"
                                    className="btn-board__header  btn-primary  btn">
                                    Добавить
                                </button>
                                <button
                                    className="btn-board__header  btn"
                                    onClick={onClose}
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
})

export default ModalWindow;





