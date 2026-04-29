import React from 'react'
import grades from '../assets/grades.png'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'

const Marks = () => {

    const {axios,selectedClass} = useAppContext()

    const [evaluatedSubmissions,setEvaluatedSubmissions] = useState([])

    useEffect(()=>{
        if(!selectedClass) return

        const fetchStudentMarks = async ()=>{
            const {data} = await axios.get(`/api/assignment/submissions/${selectedClass}`)

            if(data.success){
                const filtered = data.submissions.filter(
                    sub => sub.evaluated === true
                )

                setEvaluatedSubmissions(filtered)
            }
        }
        fetchStudentMarks()
    },[selectedClass])

  return (
    <div className='p-6 w-full'>
        <h2 className='text-2xl font-semibold text-blue-600 mb-10'>Internal Marks - {selectedClass} </h2>
        {
            (evaluatedSubmissions.length === 0) ? (
                <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
                    <img src={grades} alt="" className='w-60 mt-10' />
                    <h2 className='text-xl text-blue-600 font-medium'>No Grades Assigned yet !</h2>
                </div>
            ) :
            evaluatedSubmissions.map((sub)=>(
                    <div key={sub._id} className='w-full bg-green-100 flex items-center gap-10 px-7 py-5 rounded-xl'>
                        <h1 className='text-gray-600 font-semibold text-xl'>{sub.assignmentId.title}</h1>
                        <p className='text-xl text-green-400'>Marks Awarded: {sub.marks}/{sub.assignmentId.maxMarks}</p>
                    </div>
            ))
        }
    </div>
  )
}

export default Marks