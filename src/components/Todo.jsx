import React from "react"

export default function Todo(props) {
    const [isBeingEdited, setIsEdited] = React.useState(false)

    function handleTodoCheck() {
        props.checkTodo(props.todo.id)
    }

    function handleTodoDelete() {
        props.deleteTodo(props.todo.id)
    }

    function toggleIsBeingEdited() {
        setIsEdited(prevIsBeingEdited => !prevIsBeingEdited)
    }

    function handleTextChange(event) {
        props.setText(props.todo.id, event.target.value)
    }

    return (
        <div className="todo">
            <div className="todo--left">
                <input className="todo--checkbox" type="checkbox" checked={props.todo.complete} onChange={handleTodoCheck} />
                {
                    isBeingEdited ?
                    <textarea onChange={handleTextChange} value={props.todo.text}/>
                    :
                    <div>{props.todo.text}</div>
                }
            </div>
            <div className="todo--right">
                <div className="material-symbols-outlined todo--edit" onClick={toggleIsBeingEdited}>{isBeingEdited ? "save" : "edit"}</div>
                <div className="material-symbols-outlined todo--close" onClick={handleTodoDelete}>close</div>
            </div>
        </div>
    )
}