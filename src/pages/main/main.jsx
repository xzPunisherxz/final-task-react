import React from "react";
import Header from "../../components/header/header";
import Board from "../../components/board/board";
import { observer } from "mobx-react-lite";



const Main = observer (({tasks, users, newTasks}) => {
    
    return(
        <>
        <Header location={window.location.pathname}/>
        <Board tasks={ tasks } users={ users } location={window.location.pathname}/>
        </>
    )
})

export default Main;