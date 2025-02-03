
import { useState, useEffect } from 'react'
import { useKeycloak } from '@react-keycloak/web'
import {TodoProvider} from './contexts'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import TodoForm from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { Header } from './components/Header'
import {Pagination} from './components/Pagination'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

function App() {
  const [todos, setTodos] = useState([])
  const [shouldRerender , setShouldRerender] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [userID, setUserID] = useState(null);
    const {keycloak, initialized} = useKeycloak();

    const username = keycloak.idTokenParsed?.preferred_username;
    const limit = 6;



useEffect(() => {
    if(initialized && keycloak.authenticated) {
        const user = keycloak.tokenParsed;
        if(user?.sub) {
            setUserID(user.sub);
        }
    }
}, [initialized, keycloak.authenticated, keycloak.tokenParsed]);


    const getAuthHeader = async () => {
        if (keycloak.authenticated) {
          try{
            await keycloak.updateToken(30);
            return { Authorization: `Bearer ${keycloak.token}` }
            }catch(err){
              console.error('Token refresh failed:',err);
              keycloak.logout();
              return {};
            }
        }
        return {};
        }

        useEffect(() => {
            const fetchTodos = async () => {
                if (initialized && keycloak.authenticated) {
                    try{
                        const headers = await getAuthHeader();
                        const response = await 
                        axios.get(`http://localhost:5000/api/todos?page=${currentPage}&limit=${limit}`,
                        { headers , withCredentials: true }
                        )
                        setTodos(response.data.todos);
                        setTotalCount(response.data.totalCount);
                        setTotalPages(response.data.totalPages);
                    }catch(err){
                        if(err.response.status === 401){
                            keycloak.logout();
                        }
                        console.error('Error fetching todos:', err);
                    }
                }
            };
            fetchTodos();

          }, [initialized, keycloak, currentPage, shouldRerender]);
      
          
          
          const addTodo = (todo) => {
              if(keycloak.authenticated) {
                  getAuthHeader().then((headers) => {
                  axios.post("http://localhost:5000/api/todos", {todo}, {headers})
                     .then(() => setShouldRerender(!shouldRerender))
                       .catch((err) => console.log(err))  
                     });
                  }
             }

    const updateTodo = (id, updatedTodo) => {
        if (keycloak.authenticated) {
            getAuthHeader().then((headers) => {
                axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo, { headers })
                
                .then((response) => {
                    const updatedTodos = todos.map((todo) =>
                        todo.id === id ? response.data : todo
                    );         
                    setTodos(updatedTodos);
                       
                    })
                    .catch((err) => console.error(err));
            })
        }        
    };
    
    const deleteTodo = (id) => {
        if (keycloak.authenticated) {
            getAuthHeader().then((headers) => {
                axios.delete(`http://localhost:5000/api/todos/${id}`, {headers})
                 .then(() => setShouldRerender(!shouldRerender))
                .catch((err) => console.error(err));
            });
        }
    };
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    if (!initialized) return <div className='text-center py-10'>Loading....</div>
    
    return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo}}>
        <ToastContainer />
            <div className="bg-[#172842] min-h-screen">
                <Header username={username} onLogout={() => keycloak.logout} />
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <TodoList todos={todos} />  

                        <pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        />
                </div>
            </div>
        </TodoProvider>
  )
}

export default App
