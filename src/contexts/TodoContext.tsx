import {createContext, useContext} from "react"

interface Todo {
    id: number;
    todo: string;
}

interface TodoContextType {
    todos: Todo[];
    addTodo: (todo: string) => void;
    updateTodo: (id: number, todo: string) => void;
    deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType>({
    todos: [
        {
            id: 1,
            todo: " Todo msg",
        }
    
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) => {},
    deleteTodo: (id) => {},
})


export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider