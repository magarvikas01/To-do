
import { useState, useEffect } from 'react'
import {TodoProvider} from './contexts'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import { Header } from './components/Header'
import pagination from './components/pagination'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

function App() {
  const [todos, setTodos] = useState([])
  const [shouldRerender , setShouldRerender] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const limit = 6;

    const addTodo = (todo) => {
    // setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
    axios.post("http://localhost:5000/api/todos", {todo}).then((todos) => {
      console.log(todos.data)
      setShouldRerender(!shouldRerender)
    }).catch((err) => console.log(err))  
  }

    const updateTodo = (id, updatedTodo) => {
        axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo)
            .then((response) => {
                const updatedTodos = todos.map((todo) =>
                    todo.id === id ? response.data : todo
                );
                setTodos(updatedTodos);
                console.log(response.data);
            })
            .catch((err) => console.error(err));
    };

    const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`).then((todos) => {
      console.log(todos.data)
      setShouldRerender(!shouldRerender)
    }).catch((err) => console.log(err))    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    

    useEffect(() => {
      axios.get(`http://localhost:5000/api/todos?page=${currentPage}&limit=${limit}`)
      .then((response) => {
          setTodos(response.data.todos);
          setTotalCount(response.data.totalCount);
          setTotalPages(response.data.totalPages);
      })
      .catch((err) => console.log(err));
    }, [shouldRerender, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo}}>
            <div className="bg-[#172842] min-h-screen py-8">
                <Header />
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                                <TodoItem todo={todo} />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4"> {/* Pagination */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded bg-gray-600 text-white mr-2"
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded bg-gray-600 text-white ml-2"
                        >
                            Next
                        </button>
                        <pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </TodoProvider>
  )
}

export default App
