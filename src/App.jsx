
import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])
  const [shouldRerender , setShouldRerender] = useState(false)

  const addTodo = (todo) => {
    // setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
    axios.post("http://localhost:5000/api/todos", {todo}).then((todos) => {
      console.log(todos.data)
      setShouldRerender(!shouldRerender)
    }).catch((err) => console.log(err))  
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  useEffect( () => {
    axios.get("http://localhost:5000/api/todos").then((todos) => {
      console.log(todos.data)

      if (todos && todos.data.length > 0) {
        setTodos(todos.data)
      }
    }).catch((err) => console.log(err))  

  }, [shouldRerender])

   


  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos))
  // }, [todos])
  



  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
