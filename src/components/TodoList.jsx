import Todo from './Todo'

export default function TodoList(props) {
    const todoComps = props.todos.map(todo => {
        return <Todo key={todo.id} todo={todo} checkTodo={props.checkTodo} deleteTodo={props.deleteTodo} setText={props.setText}/>
    })

    return (
        <div className='todo-list'>
            {todoComps}
        </div>
    )
}