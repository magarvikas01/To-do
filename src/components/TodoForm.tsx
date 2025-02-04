import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
    const [todo, setTodo] = useState<string>("")
    const [error, setError] = useState<string>("");
    const {addTodo} = useTodo()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const value = e.target.value;

        // Allow only letters and spaces (no numbers or special characters)
        if (/^[A-Za-z\s]*$/.test(value)) {
            setTodo(value);
            setError(''); // Clear error when valid input
        } else {
            setError('Only letters and spaces are allowed');
        }
    };

    const add = (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()

      setError('');

      const trimmedTodo = todo.trim();
      if (!trimmedTodo) {
          setError('Todo cannot be empty');
          return;
      }

      if (trimmedTodo.length < 3) {
          setError('Todo is too short');
          return;
      }

      if (trimmedTodo.length > 200) {
          setError('Todo is too long');
          return;
      }

      addTodo(todo)
      setTodo("")
    }

    return (
        <form onSubmit={add} className="flex flex-col">
            <div className="flex">
                <input
                    type="text"
                    placeholder="Write Todo..."
                    value={todo}
                    className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                    onChange={handleInputChange}
                    aria-label="Todo input"
                />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
              disabled={!todo.trim()}
              aria-label="Add todo">
                    Add
                </button>
            </div>
            {error && <p className="text-red-500 mt-1 w-full">{error}</p>}
        </form>
    );
}

export default TodoForm;
