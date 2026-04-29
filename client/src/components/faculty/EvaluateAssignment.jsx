import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const EvaluateAssignment = () => {

  const { axios, selectedClass } = useAppContext()

  const [submissions,setSubmissions] = useState([])
  const [selectedSubmission,setSelectedSubmission] = useState(null)
  const [marksInput, setMarksInput] = useState("")

  useEffect(()=>{
    if(!selectedClass) return

    const fetchSubmissions = async ()=>{
      const {data} = await axios.get(
        `/api/assignment/submissions/${selectedClass}`
      )

      if(data.success){
        setSubmissions(data.submissions)
      }
    }

    fetchSubmissions()

  },[selectedClass])

  const assignMarks = async (marks)=>{
      const numericMarks = Number(marks)
      if(!marks) return toast.error("Enter marks")
      if(isNaN(numericMarks)) return toast.error("Invalid marks")
      if(numericMarks < 0) return toast.error("Invalid marks")

      if(numericMarks > selectedSubmission.assignmentId.maxMarks){
        return toast.error(
          `Max allowed: ${selectedSubmission.assignmentId.maxMarks}`
        )
      }

      const {data} = await axios.post('/api/assignment/evaluate',{
        submissionId: selectedSubmission._id,
        marks: numericMarks
      })

      if(data.success){
        toast.success("Marks Assigned")
        setSubmissions(prev =>
          prev.map(sub =>
            sub._id === selectedSubmission._id
              ? { ...sub, evaluated: true, marks: numericMarks }
              : sub
          )
        )

        setSelectedSubmission(null)
        setMarksInput("")
      } else {
        toast.error(data.message)
      }
    }

  return (
    <div className='p-10'>

      <h1 className='text-2xl font-bold mb-6'>
        Submissions - {selectedClass}
      </h1>

      {selectedSubmission ? (

        <div className='border-2 p-6 rounded border-blue-500'>

          <h2 className='text-xl font-bold mb-4'>
            {selectedSubmission.assignmentId.title}
          </h2>

          <p><b>Name:</b> {selectedSubmission.student.name}</p>
          <p><b>RegNo:</b> {selectedSubmission.student.regno}</p>

          <a
            href={`http://localhost:5000${selectedSubmission.answerFile.url}`}
            target="_blank"
            className='text-blue-600 underline'
          >
            View Submission
          </a>

          {selectedSubmission.evaluated ? (
            <p className='text-green-600 mt-4'>
              Marks: {selectedSubmission.marks}
            </p>
          ) : (
            <div className='mt-4 flex items-center gap-3'>
              <input
                type="number"
                value={marksInput}
                placeholder="Enter Marks"
                onChange={(e)=> setMarksInput(e.target.value)}
                className='border px-2 py-1 rounded w-32'
              />
              <button onClick={()=> assignMarks(marksInput)} 
                className='bg-blue-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-blue-700'>
                Submit
              </button>
            </div>
          )}

          <button
            onClick={()=>setSelectedSubmission(null)}
            className='mt-4 bg-gray-400 text-white px-4 py-1 rounded cursor-pointer'
          >
            Back
          </button>

        </div>

      ) : (

        submissions.length === 0 ? (
          <p>No Submissions Yet</p>
        ) : (
          submissions.map((sub)=>(
            <div
              key={sub._id}
              onClick={()=>setSelectedSubmission(sub)}
              className='border-2 p-4 mb-3 rounded cursor-pointer hover:bg-blue-100 border-blue-500'
            >
              <p className='text-blue-500'><b>{sub.assignmentId.title}</b></p>
              <p className='font-semibold'>{sub.student.name} ({sub.student.regno})</p>
            </div>
          ))
        )

      )}

    </div>
  )
}

export default EvaluateAssignment