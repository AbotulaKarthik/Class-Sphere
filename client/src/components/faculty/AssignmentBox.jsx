import React from 'react'
import { useAppContext } from '../../context/AppContext'

const AssignmentBox = ({submission}) => {
    
    const {navigate} = useAppContext()

  return (
    <div onClick={()=>navigate(`/assignment/${submission.regno}`)} className='w-full h-auto border-2 border-gray-400 px-10 py-6 rounded-[7px] cursor-pointer hover:border-green-500 flex items-center justify-between mb-4'>
        <p className='bg-green-500 rounded-full text-white px-2'>{submission.ind}</p>
        <p className='font-semibold text-blue-500'>Submitted by: <span className='text-green-500'>{submission.regno}</span></p>
        <p className='font-semibold text-gray-500'>submission Date : <span className='text-green-600'>{new Date(submission.date).toLocaleDateString()}</span></p>
    </div>
  )
}

export default AssignmentBox