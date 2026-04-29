import React, { Fragment } from 'react'
import { dummySubmissions } from '../../assets/assets'
import award from '../../assets/award.png'
import { useAppContext } from '../../context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'

const AwardedMarks = () => {

  const {axios,selectedClass} = useAppContext()

  const [evaluatedStudents,setEvaluatedStudents] = useState([])

  useEffect(()=>{
    if(!selectedClass) return

    const fetchEvaluated = async ()=>{
      const {data} = await axios.get(`/api/assignment/submissions/${selectedClass}`)

      if(data.success){
        const filtered = data.submissions.filter(
          sub => sub.evaluated === true
        )

        setEvaluatedStudents(filtered)
      }
    }

    fetchEvaluated()
  },[selectedClass])

  return (
    <div className='px-16 py-6 w-full'>
      <h1 className='text-green-500 font-semibold text-xl mb-10'>Marks Awarded in {selectedClass} for students :</h1>
      <div className='flex items-center gap-30 w-full'>
        <div className='w-[55%]'>
          <div className='grid grid-cols-3 gap-4 p-4 border-b-2 font-semibold text-blue-600'>
            <div>Reg.No</div>
            <div>Status</div>
            <div>Marks Awarded</div>
          </div>
          <div className='grid grid-cols-3 gap-4 p-4 h-full overflow-y-scroll myDiv'>
            {
              evaluatedStudents.length === 0 ? (
                <p className='text-gray-500 col-span-3'>
                  No evaluated submissions yet
                </p>
              ) : (
                evaluatedStudents.map((sub)=> (
                  <React.Fragment key={sub._id}>
                    <div className='text-blue-500 font-semibold'>
                      {sub.student.regno}
                    </div>
                    <div className='text-green-600 font-semibold'>
                      Evaluated
                    </div>
                    <div className={`font-semibold ${sub.marks >= sub.assignmentId.maxMarks*0.7 ? 'text-green-500': 'text-red-500'}`}>
                      {sub.marks} / {sub.assignmentId.maxMarks}
                    </div>
                  </React.Fragment>
                ))
              )
            }
          </div>
        </div>
        <div>
          <img src={award} alt="" width={300} />
        </div>
      </div>
    </div>
  )
}

export default AwardedMarks