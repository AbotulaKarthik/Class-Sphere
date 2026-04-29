import React, { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import assignWork from '../../assets/assignWork.png'
import { useAppContext } from '../../context/AppContext'

const AssignWork = () => {

    const {axios, selectedClass} = useAppContext()

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [date,setDate] = useState("")
    const [maxMarks,setMaxMarks] = useState("")
    const [file,setFile] = useState(null)
    const [loading,setLoading] = useState(false)
    const fileInputRef = useRef(null)

    const onSubmitHandler = async (e)=>{
        e.preventDefault()

        if(!selectedClass){
            return toast.error("Select a class first")
        }
        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("title",title)
            formData.append("description",description)
            formData.append("dueDate",date)
            formData.append("maxMarks",maxMarks)
            formData.append("classId",selectedClass)

            if(file){
                formData.append("questionFile",file)
            }

            const {data} = await axios.post('/api/assignment/create', formData ,{
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })

            if(data.success){
                toast.success("Work assigned successfully")
                setTitle("")
                setDescription("")
                setDate("")
                setMaxMarks("")
                setFile(null)
                fileInputRef.current.value = ""
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message || "Error creating assignment")
        }finally {
            setLoading(false)
        }
    }

  return (
    <div className='px-20 py-5 flex items-center gap-50'>
        <div>
            <h1 className='text-blue-500 font-bold text-2xl mb-10'>Create Assignment</h1>
            <form onSubmit={onSubmitHandler}>
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-blue-500 font-semibold text-[16px]'>Assignment Title</label>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" name="" id="" className='w-150 border-2 rounded h-auto py-2 px-2 outline-none border-gray-400'/>
                </div>
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-blue-500 font-semibold text-[16px]'>Description of the Assignment</label>
                    <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} className='w-150 border-2 rounded h-auto py-2 px-2 outline-none border-gray-400'>                            
                    </textarea>
                </div>
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-blue-500 font-semibold text-[16px]'>Due Date</label>
                    <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" name="" id="" className='w-150 border-2 rounded h-auto py-2 px-2 outline-none border-gray-400'/>
                </div>
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-blue-500 font-semibold text-[16px]'>Maximum Marks</label>
                    <input value={maxMarks} onChange={(e)=>setMaxMarks(e.target.value)} type="number" name="" id="" className='w-150 border-2 rounded h-auto py-2 px-2 outline-none border-gray-400'/>
                </div>
                <div className='flex flex-col gap-1 mb-4'>
                    <label className='text-blue-500 font-semibold text-[16px]'>Documents if Needed</label>
                    <input ref={fileInputRef} onChange={(e)=>setFile(e.target.files[0])} type="file" name="" id="" className='w-150 border-2 rounded h-auto py-2 px-2 outline-none border-gray-400'/>
                </div>
                <button type='submit' disabled={loading} className='w-150 bg-blue-500 py-2.5 text-white rounded-[10px] cursor-pointer hover:bg-blue-700'>
                    {loading ? "Creating..." : "Assign"}
                </button>
            </form>
        </div>
        <img src={assignWork} alt="" className='w-100' />
    </div>
  )
}

export default AssignWork