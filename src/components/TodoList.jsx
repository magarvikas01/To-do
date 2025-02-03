import TodoItem from "./TodoItem";

export const TodoList = ({ todos }) => {    
    return (
        <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
               < div key={todo.id} className='w-full'>
                    <TodoItem todo={todo} />
                </div>
            ))}
        </div>
    );
}