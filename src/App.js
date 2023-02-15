import './App.css';
import {useState} from "react";
import uniqid from "uniqid";
import {RiDeleteBin4Line} from "react-icons/ri";
import Todo from "./Todo";

function App() {
    const [todo, setTodo] = useState(JSON.parse(localStorage.getItem('mode')) || false)
    const changeTodo = (mode) => {
        setTodo(!todo)
        localStorage.setItem('mode', JSON.stringify(!mode))
    }


    const [value, setValue] = useState('')
    const [task, setTask] = useState([])
    const addTask = () => {
        const newTasks = {
            id: uniqid(),
            name: value,
            isDone: false
        }
        setTask([...task, newTasks])
    }

    const deleteTask = (idx) => {
        setTask(task.filter(el => el.id !== idx))
    }

    const updateStatus = (id) => {
        setTask(task.map(el => el.id === id ? {...el, isDone: !el.isDone} : el))
    }
    const updateName = (id, text) => setTask(task.map(el => el.id === id ? {...el, name: text} : el))

    return (
        <div className="App h-[100%] p-36  "
             style={{background: todo ? '#a78bfa' : '#60a5fa', color: todo ? '#FFF' : ''}}>
            <div className=' pt-4 flex items-center justify-center'>
                <button onClick={() => changeTodo(todo)} type="button "
                        className="  text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple
                    to Pink
                </button>
            </div>

            <div className='container '>
                <div className='flex items-center justify-center pt-20 '>
                    <input value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={(e) => {
                        switch (e.key) {
                            case"Enter":
                                value && addTask()
                                setValue('')
                        }
                    }} type="search"
                           id="default-search"
                           className="block w-[30%] p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required/>
                    <button onClick={() => {
                        value && addTask()
                        setValue('')
                    }} type="button"
                            className=" mx-2 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Purple
                    </button>
                </div>
                <div className='flex justify-center py-10'>
                    <ul className="w-[36%]  text-sm font-medium text-gray-900 bg-white  border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {
                            task.filter(el => !el.isDone).map(el => (
                                <Todo el={el} deleteTask={deleteTask} updateStatus={updateStatus} updateName={updateName}/>
                            ))
                        }
                    </ul>
                </div>
                <p className='flex items-center justify-center text-white'>закончиные дела :</p>
                <div className='flex justify-center py-10'>
                    <ul className="w-[36%]  text-sm font-medium text-gray-900 bg-white  border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        {
                            task.filter(el => el.isDone).map(el => (
                                <li className="  flex items-center justify-between w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    <div className='flex items-center'>
                                        <input onClick={() => updateStatus(el.id)} checked={el.isDone} type="checkbox"/>
                                        <span className='ml-8 text-[#1d4ed8]'>{el.name}</span>
                                    </div>
                                    <div className='flex items-center'>
                                        <button onClick={() => deleteTask(el.id)}
                                                className=' p-2 rounded bg-blue-800 text-white'><RiDeleteBin4Line/>
                                        </button>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
