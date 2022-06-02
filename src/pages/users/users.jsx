import React from "react";
import Board from "../../components/board/board";
import Header from "../../components/header/header";
import { observer } from "mobx-react-lite";

const Users = observer (({ tasks, users}) => {    

    return (
        <>
        <Header />
        <Board tasks={tasks} users={ users } />
        </>

    )
}
)

export default Users;