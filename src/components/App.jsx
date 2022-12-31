import React from "react"
import Nav from "./Nav"
import TodoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = "todoApp.todos"

export default function App() {
  const [todos, setTodos] = React.useState([])
  const [formData, setFormData] = React.useState({
    newTodo: ""
  })

  React.useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

    const defaultTodos = [
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
    
    setTodos(prevTodos => {
      if (storedTodos) {
        if (prevTodos.length === 0) {
          if (storedTodos.length === 0) {
            return defaultTodos
          } else {
            return storedTodos
          }
        } else {
          return prevTodos
        }
      } else {
        defaultTodos
      }
    })
  }, []);

  React.useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function deleteTodo(id) {
    const newTodos = [...todos]
    const idx = newTodos.findIndex(todo => todo.id === id)
    newTodos.splice(idx, 1)
    setTodos(newTodos)
  }

  function checkTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function setText(id, text) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.text = text
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    if (formData.newTodo === "") return

    setTodos(prevTodos => {
      return [
        ...prevTodos,
        { id: uuidv4(), text: formData.newTodo, complete: false }
      ]
    })

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        newTodo: ""
      }
    })
  }

  function handleClearCompleted(e) {
    const newTodos = todos.filter(todo => !todo.complete)

    setTodos(newTodos)
  }

  function handleFormChange(event) {
    const {name, value} = event.target

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  return (
    <>
      <Nav />
      <main className="main">
        <div className="left-to-do">{todos.filter(todo => !todo.complete).length} left to do</div>
        <TodoList todos={todos} checkTodo={checkTodo} deleteTodo={deleteTodo} setText={setText}/>
        <div className="bottom-ui">
          <input
            className="bottom-ui--text"
            type="text"
            placeholder="New Todo"
            name="newTodo"
            value={formData.newTodo}
            onChange={handleFormChange}
          />
          <button className="bottom-ui--add" onClick={handleAddTodo}>Add</button>
          <button className="bottom-ui--clear" onClick={handleClearCompleted}>Clear All Completed</button>
        </div>
      </main>
    </>
  )
}