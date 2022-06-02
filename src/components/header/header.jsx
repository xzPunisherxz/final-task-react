import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams  } from "react-router-dom";
import { AppRoute } from "../../const";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import { users } from "../../store/index";


const Header = observer (() => {

    const [loggedUser, setLoggedUser] = useState([])

    if ((loggedUser.length === 0) && (localStorage.length > 0)) {
        setLoggedUser(JSON.parse(localStorage.getItem("loggedUserInfo")));
    }

    useEffect(() => {
        runInAction(() => {
            if (loggedUser.id) {
                users.fetchLoggedUser(loggedUser.id)
            }
        })
    }, [loggedUser]);

    const setDefaulUserPic = () => {
        return (users.loggedUser.photoUrl === null) || (users.loggedUser.photoUrl === undefined) ? "../../images/defualt-user-icon.png" : users.loggedUser.photoUrl;
    }

    const { pathname } = useLocation();
    const { id } = useParams();
    const { userid } = useParams();

    const loggedOut = () => {
        localStorage.removeItem("loggedUserInfo");
        localStorage.removeItem("userPassword");
        users.loggedUser = [];
        users.password = null;
        window.location.href = `${AppRoute.LOGIN}`;
    }

    const headerInner = () => {
    
    if (pathname !== AppRoute.LOGIN) {
        return (
            <>
            <section className="main__header-wrap">
             <div  className="main__header-group-lnk">
                <Link to={AppRoute.TASKS}  
                className={`main__header-lnk ${(pathname === AppRoute.TASKS
                    || pathname === `${AppRoute.TASKS}/${id}`
                    || pathname === AppRoute.ADD
                    || pathname === `${AppRoute.ADD}/${id}`
                    || pathname === `${AppRoute.USERS}/${userid}/add`) && "lnk-active"}`} >
                    Задачи</Link>
                <Link to={AppRoute.USERS}  
                className={`main__header-lnk user-lnk 
                ${(pathname === AppRoute.USERS
                    || pathname === `${AppRoute.USERS}/${id}`) && "lnk-active"}`}>
                    Пользователи</Link>
            </div>
            <div  className="main__user-profile dropdown">
                <span  className="username">{users.loggedUser.username}</span>
                <div className="main__user-img-wrapper  ">
                        <img className="main__user-img"
                         src={setDefaulUserPic()} width="40" height="40" 
                         alt="Изображение профиля" />
                </div>
                <div className="main__user-list dropdown-content">
                        <Link to={`${AppRoute.USERS}/${users.loggedUser.id}`}
                         className="dropdown-link">Посмотреть профиль</Link>
                            <button
                                onClick={() => loggedOut()}
                                className="dropdown-link  accent"
                                >Выйти из системы</button>
                </div>
            </div>
            </section>
         </>
        );
      }
   }  
    
        return (
            <section  className="main__header">
            
                <img src="../../images/Logo.png" alt="logo" />                
            {headerInner()}
         </section> 
    )
})

export default Header;


    