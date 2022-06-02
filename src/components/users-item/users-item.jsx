import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { AppRoute } from "../../const";


const UsersItem = observer (({id, username}) => {
    
    return (
        <>
        <div className="users-task">                   
            <div className="task-user">
                <Link to={`${AppRoute.USERS}/${id}`} 
                className="task-user-name"
                >{username}</Link>
            </div>                         
         </div>
        </>
    )
})

export default UsersItem;