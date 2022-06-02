import React from "react";
import Header from "../../components/header/header";
import Board from "../../components/board/board";
import { observer } from "mobx-react-lite";


const EditAdd = observer  (({tasks, users}) => {
    return (
        <>
        <Header />
        <Board tasks={tasks} users={users}/>
        </>        
    )
})

export default EditAdd;