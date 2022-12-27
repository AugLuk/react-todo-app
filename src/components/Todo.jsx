export default function Todo({ todo, toggleTodo, deleteTodo }) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }

    function handleTodoDelete() {
        deleteTodo(todo.id)
    }

    return (
        <div className="todo">
            <div className="todo--left">
                <input className="todo--checkbox" type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
                <div>{todo.text}</div>
            </div>
            <button className="material-symbols-outlined todo--close" onClick={handleTodoDelete}>close</button>
        </div>
    )
}