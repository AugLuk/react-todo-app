import React from "react"
import Nav from "./Nav"
import TodoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = "todoApp.todos"

export default function App() {
  const [todos, setTodos] = React.useState([])

  const todoTextRef = React.useRef()

  React.useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    
    if (storedTodos) setTodos(prevTodos => {
      if (prevTodos.length === 0) {
        if (storedTodos.length === 0) {
          return [
            {
              id: 0,
              text: "Buy milk",
              complete: false
            },
            {
              id: 1,
              text: "Take out the trash",
              complete: true
            },
            {
              id: 2,
              text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              complete: false
            }
          ]
        } else {
          return storedTodos
        }
      } else {
        return prevTodos
      }
    })
  }, []);

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function deleteTodo(id) {
    const newTodos = [...todos]

    newTodos.splice(newTodos.indexOf(id))

    setTodos(newTodos)
  }

  function toggleTodo(id) {
    const newTodos = [...todos]

    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete

    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const text = todoTextRef.current.value

    if (text === "") return

    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), text: text, complete: false }]
    })

    todoTextRef.current.value = null
  }

  function handleClearCompleted(e) {
    const newTodos = todos.filter(todo => !todo.complete)

    setTodos(newTodos)
  }

  return (
    <>
      <Nav />
      <main className="main">
        <div className="left-to-do">{todos.filter(todo => !todo.complete).length} left to do</div>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        <div className="bottom-ui">
          <input className="bottom-ui--text" ref={todoTextRef} type="text" placeholder="New Todo" />
          <button className="bottom-ui--add" onClick={handleAddTodo}>Add</button>
          <button className="bottom-ui--clear" onClick={handleClearCompleted}>Clear All Completed</button>
        </div>
      </main>
    </>
  )
}