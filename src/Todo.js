import React, {useState} from 'react';
import {BsCheckCircleFill} from "react-icons/bs";
import {BiPencil} from "react-icons/bi";
import {RiDeleteBin4Line} from "react-icons/ri";

const Todo = ({updateStatus, el, deleteTask, updateName}) => {
        const [edit, setEdit] = useState(false)
        const [newName, setName] = useState(`${el.name}`)
        const getName = (e) => setName(e.target.value)

        const closeInput = (id, text) => {
            updateName(id, text)
            setEdit(false)
        }
        const openInput = () => setEdit(true)
        return (
            <>
                <li className="  flex items-center justify-between w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                    <div className='flex items-center'>
                        <input onClick={() => updateStatus(el.id)} checked={el.isDone} type="checkbox"/>
                        {

                            edit ? <input onKeyDown={(e) => {
                                    if (e.key === 'Enter') closeInput(el.id, newName)
                                }
                                }
                                          onChange={getName} type="text" defaultValue={newName}
                                          className='bg-gray-500 px-2 py-1 rounded-l outline-0 border-0 '/> :
                                <span className='ml-8 text-[#e11d48]'>{el.name}</span>
                        }

                    </div>
                    <div className='flex items-center'>
                        <button onClick={() =>
                            edit ? closeInput(el.id, newName) : openInput()
                        }
                                className=' mr-2 p-2 rounded bg-orange-400 text-white'>
                            {
                                edit ? <BsCheckCircleFill/> : <BiPencil/>
                            }
                        </button>
                        <button onClick={() => deleteTask(el.id)}
                                className=' p-2 rounded bg-blue-800 text-[#fff]'><RiDeleteBin4Line/>
                        </button>
                    </div>
                </li>
            </>
        );
    }
;

export default Todo;