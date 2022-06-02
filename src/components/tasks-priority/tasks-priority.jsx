import React from "react";
import { observer } from "mobx-react-lite";

const TasksPriority = observer (({rank}) => {
    if(rank === "low") {
        return (
          <img src="../images/Low.png" alt="priority"/>
        )
      } else if(rank === "medium") {
        return(
          <img src="../images/Mid.png" alt="priority"/>
        )
      } else if(rank === "high") {
        return (
          <img src="../images/High.png" alt="priority"/>
        )
      }
})

export default TasksPriority;