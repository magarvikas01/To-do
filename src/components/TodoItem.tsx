import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';
import { toast } from 'react-toastify';

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState<boolean>(false)
  const [todoMsg, setTodoMsg] = useState<string>(todo.todo)
  const {updateTodo, deleteTodo} = useTodo()

    const editTodo = ():void => {

  const trimmedMsg = todoMsg.trim();
        if (trimmedMsg.length < 2 || trimmedMsg.length > 50) {
            toast.error("Todo should be between 2 and 50 characters");
            return;
        }

        const regex = /[^a-zA-Z\s]/;
        if (regex.test(trimmedMsg)) {
            toast.error("Only alphabets are allowed");
            return;
        }
    updateTodo(todo.id, {...todo, todo: trimmedMsg})
    setIsTodoEditable(false)
  }
  

    return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black bg-[#ccbed7]`}
      >
            <input
                type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
                maxLength={50}
            />
          
          
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;