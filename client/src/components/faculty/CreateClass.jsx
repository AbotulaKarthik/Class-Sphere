import React, { useState } from 'react'
import create from '../../assets/create.png'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const CreateClass = () => {

    const {axios, facultyClasses} = useAppContext()

    const [classId,setClassId] = useState("")
    const [className, setClassName] = useState("")

    const handleCreate = async ()=>{
        try {
            if(!classId) return toast.error("Enter classID")
            if(!className) return toast.error("Enter className")
            
            const {data} = await axios.post('/api/class/create',{
                classId,className
            })

            if(data.success){
                toast.success(data.message)
                setClassId("")
                setClassName("")
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='px-16 py-10'>
        <h1 className='text-2xl font-semibold text-blue-500'>Create The Class with <span className='text-blue-900 font-bold'>ClassId</span> and <span className='text-blue-900 font-bold'>ClassName</span></h1>
        <div className='flex items-center gap-60'>
            <div className='w-[50%] h-full overflow-y-scroll myDiv'>
                <div className='mt-6 flex flex-col gap-3'>
                    <input type="text" name="" id="" placeholder='AP202526CSE2001' value={classId} onChange={(e)=>setClassId(e.target.value)}
                    className='w-[70%] border-2 border-gray-300 rounded-[10px] h-10 outline-none px-3'/>
                    <input type="text" name="" id="" placeholder='DataBase Management System' value={className} onChange={(e)=>setClassName(e.target.value)}
                    className='w-[70%] border-2 border-gray-300 rounded-[10px] h-10 outline-none px-3'/>
                    <button onClick={handleCreate} className='w-[70%] bg-blue-500 text-white py-2 rounded-[10px] hover:bg-blue-600 cursor-pointer'>Create</button>
                </div>
            </div>
            <img src={create} alt="" width={400}/>
        </div>
        <h2 className='font-semibold text-green-500 text-[18px] mb-4'>Available Classes</h2>
        <div className='myDiv overflow-y-scroll w-[50%] px-6'>
            {
                facultyClasses.map((cls,ind)=>(
                    <div key={ind} className='bg-blue-500 px-8 text-white font-semibold py-2.5 rounded-md mb-1 flex items-center justify-between'>
                        <p className='bg-white rounded-full text-blue-500 px-2.5 py-0.2'>{ind+1}</p>
                        <p>{cls.classId}</p>
                        <p>{cls.className}</p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default CreateClass