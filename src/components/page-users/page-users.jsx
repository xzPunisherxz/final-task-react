import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import UsersItem from "../users-item/users-item";

const PageUsers = observer (({ users }) => {
    const [startStep, setStartStep] = useState(1)
    const [endStep, setEndStep] = useState(10)

    const props = {
        startStep,
        setStartStep,
        endStep,
        setEndStep
    }
    return (
        <div className="page-users">               
                     {users.slice(startStep -1, endStep).map(user => <UsersItem {...user} key={user.id} />)}              
             </div>
    )
})

export default PageUsers;