import React, { useEffect, useRef, useState } from 'react';
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems';


const Todo = () => {

const [todoList, setTodoList] = useState(localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []);

const inputRef = useRef();

const add = () =>{
    const inputText = inputRef.current.value.trim();

    if(inputText===""){
        return null;
    }
    
    const newTodo = {
        id:Date.now(),
        text:inputText,
        isComplete:false,
    }

    setTodoList((prev)=>[...prev,newTodo])
    inputRef.current.value = "";
}

const deleteTodo = (id) => {
    setTodoList((prvsTodos)=>{
        return prvsTodos.filter((todo)=> todo.id!== id )
    })
}

const toggle = (id) => {
    setTodoList((prevTodo)=>{
        return prevTodo.map((todo)=>{
            if(todo.id === id){
                return {...todo,isComplete:!todo.isComplete};
            }
            return todo;
        })
    })
}

useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todoList))
},[todoList])


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

        <div className='flex mt-7 items-center gap-2'>
            <img className='w-7' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>Todo-List</h1>
        </div>


        <div className='flex items-center my-7 rounded-full bg-gray-200'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add Text' />
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add +</button>
        </div>

        <div>
            {todoList.map((item,index)=>{

                return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>

            })}
        </div>
        
    </div>
  )
}

export default Todo