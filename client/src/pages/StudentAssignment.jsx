import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { useRef } from 'react'

const StudentAssignment = () => {

  const { id } = useParams()
  const { axios, selectedClass } = useAppContext()

  const fileInputRef = useRef(null)

  const navigate = useNavigate()

  const [assignment,setAssignment] = useState(null)
  const [file,setFile] = useState(null)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const fetchAssignment = async ()=>{
      const {data} = await axios.get(`/api/assignment/${id}`)
      if(data.success){
        setAssignment(data.assignment)
      }
    }
    fetchAssignment()
  },[id])

  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!file){
      return toast.error("Upload PDF")
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("assignmentId",id)
      formData.append("classId",selectedClass)
      formData.append("answerFile",file)

      const {data} = await axios.post('/api/assignment/submit',formData,{
        headers:{ "Content-Type":"multipart/form-data" }
      })

      if(data.success){
        toast.success("Submitted Successfully")
        setFile(null)
        if(fileInputRef.current){
            fileInputRef.current.value = ""
        }
        navigate('/')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error("Submission Failed")
    } finally{
      setLoading(false)
    }
  }

  if(!assignment) return <p className='p-6'>Loading...</p>

  return (
    <div className='p-10 flex items-center justify-center flex-col'>

      <h1 className='text-4xl font-bold text-blue-600'>
        {assignment.title}
      </h1>

      <p className='mt-4 text-gray-600 font-semibold'>
        {assignment.description}
      </p>

      <p className='mt-4 font-semibold'>
        Due: <span className='text-red-400'>{new Date(assignment.dueDate).toLocaleDateString()}</span>
      </p>

      <p>
        Max Marks: {assignment.maxMarks}
      </p>

      {assignment.questionFile && (
        <a
          href={`http://localhost:5000${assignment.questionFile.url}`}
          target="_blank"
          className='bg-green-500 text-white px-8 py-2 rounded inline-block mt-4'
        >
          View Question PDF
        </a>
      )}

      <form onSubmit={handleSubmit} className='mt-18 flex'>
        <div className='flex flex-col border-2 border-gray-300 px-4 py-1 rounded-md'>
            <label className='text-blue-500'>Select File</label>
            <input
            type="file"
            ref={fileInputRef}
            onChange={(e)=>setFile(e.target.files[0])}
            />
        </div>

        <button
          type="submit"
          disabled={loading}
          className='bg-blue-600 text-white px-6 py-2 rounded ml-4 cursor-pointer'
        >
          {loading ? "Submitting..." : "Submit Assignment"}
        </button>
      </form>

    </div>
  )
}

export default StudentAssignment