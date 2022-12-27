import Todo from './Todo'

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
    const todoComps = todos.map(todo => {
        return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    })

    return (
        <div className='todo-list'>
            {todoComps}
        </div>
    )
}