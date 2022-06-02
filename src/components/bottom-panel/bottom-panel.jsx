import React from "react";
import { observer } from "mobx-react-lite";
import { action } from "mobx";

const BottomPanel = observer (({ props }) => {
    const {
        arrayLength,
        startStep,
        setStartStep,
        endStep,
        setEndStep,
        currentPage,
        setCurrentPage
    } = props

    const shownTasks = () => {
        if (endStep >= arrayLength) {
            return endStep - (endStep - arrayLength);
        } else {
            return (endStep);
        }
    }

    const handleNextPage = action(() => {
        if (arrayLength >= endStep) {
            setStartStep(startStep + 10);
            setEndStep(endStep + 10);
            setCurrentPage(currentPage + 1);
        }
    })

    const handlePrevPage = action(() => {
        if (endStep >= 0) {
            setStartStep(startStep - 10);
            setEndStep(endStep - 10);
            setCurrentPage(currentPage - 1);
        }
    })

    const handleChangePage = action((e) => {
        e.preventDefault();
        setStartStep(+e.target.value * 10 - 9);
        setEndStep(+e.target.value * 10);
        setCurrentPage(+e.target.value);
    })

    const pages = () => {
        if (arrayLength === 0) {
            const lastPage = 1;
            return ([...Array(lastPage).keys()].map(x => ++x));
        } else {
            const lastPage = Math.ceil(arrayLength / 10);
            return ([...Array(lastPage).keys()].map(x => ++x));
        }
    }


    return (
        <div className="bottom-panel">
                 <div className="bottom-panel__left">
                     <button className="btn-disabled btn">Назад</button>
                     {pages().map((page) =>
                        <button
                            className={`btn-pagination  btn  ${currentPage === page && `active`}`}
                            onClick={handleChangePage}
                            key={page}
                            value={page}
                        >{page}
                        </button>
                    )}
                     <button className="btn-default  btn" disabled={!(arrayLength >= endStep)}
                        onClick={handleNextPage}>Вперёд</button>
                 </div>
                 <div className="bottom-panel__right">
                    <span className="bottom-panel__right-content">{`Показано ${startStep} - ${shownTasks()} из ${arrayLength}`}</span>
                 </div>
             </div>
    )
})

export default BottomPanel;