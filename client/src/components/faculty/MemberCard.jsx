import React from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const MemberCard = ({member,index,setStudents}) => {

  const {axios,selectedClass} = useAppContext()

  const handleRemove = async (studentId)=>{
    try {
      const {data} = await axios.delete('/api/class/remove-student',{
        data:{
          classId: selectedClass,
          studentId
        }
      })

      if(data.success){
        toast.success(data.message)
        setStudents(prev => prev.filter(student => student._id !== studentId))
        
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='w-full h-17.5 flex items-center justify-between py-4 px-5 rounded-xl mb-3 border-3 border-green-200 hover:border-blue-300 hover:bg-blue-100 cursor-pointer'>
        <h1 className='rounded-full bg-blue-500 text-white px-2'>{index+1}</h1>
        <h1 className='text-blue-600 font-bold text-xl'>{member.name}</h1>
        <h1 className='text-gray-500 font-semibold text-xl'>{member.regno}</h1>
        <p className='font-semibold text-blue-400'>{member.email.slice(0,20)+"..."}</p>
        <button onClick={()=> handleRemove(member._id)} className='text-white bg-red-500 rounded-md px-3 py-1 cursor-pointer'>
          Remove
        </button>
    </div>
  )
}

export default MemberCard