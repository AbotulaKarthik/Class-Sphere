import React from 'react'
import { useNavigate } from 'react-router-dom'

const TaskBox = ({assignment,index}) => {

    const navigate = useNavigate()

  return (
    <div onClick={()=> navigate(`/assignment/${assignment._id}`)} className='h-auto w-full min-h-20 flex items-center justify-between px-4 py-5 bg-blue-100 rounded-2xl cursor-pointer hover:scale-101 md:px-6'>
        <p className='bg-blue-500 rounded-full px-2 text-white'>{index+1}</p>
        <h2 className='font-bold text-xl'>{assignment.title || "No Title"}</h2>
        <h3 className='font-semibold text-blue-400'>{assignment.description.slice(0,35)+"...." || "NO description"}</h3>
        <p className='font-semibold'>Due Date: <span className='text-red-400'>{assignment.dueDate? new Date(assignment.dueDate).toLocaleDateString(): "N/A"}</span></p>
        <p className='font-semibold'>Internals: <span className='text-green-400'>{assignment.maxMarks}</span></p>
    </div>
  )
}

export default TaskBox
