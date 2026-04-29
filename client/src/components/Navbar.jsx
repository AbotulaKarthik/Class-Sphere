import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Navbar = () => {

    const {axios,navigate,setStudent, facultyClasses, studentClasses,selectedClass, setSelectedClass, faculty, student } = useAppContext()

    const logout = async ()=>{
        try {
            const {data} = await axios.get('/api/student/logout')
            if(data.success){
                toast.success(data.message)
                setStudent(null)
                navigate('/')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='w-full md:h-16 h-12 flex items-center justify-between px-3 md:px-10 py-2 overflow-hidden bg-transparent shadow sticky top-0 z-50'>
        <h1 className='text-2xl md:text-3xl font-bold text-gray-700 cursor-pointer'>
            <span className='text-blue-500'>C</span>lass
            <span className='text-blue-500'>Sphere</span>
        </h1>
        <div className='flex items-center gap-8'>
            {
                faculty && facultyClasses.length > 0 && (
                    <select
                        value={selectedClass || ""}
                        onChange={(e)=> setSelectedClass(e.target.value)}
                        className='rounded px-2 py-1 font-medium outline-none  cursor-pointer'
                    >
                        {
                            facultyClasses.map((cls)=>(
                                <option key={cls._id} value={cls.classId}>
                                    {cls.classId}
                                </option>
                            ))
                        }
                    </select>
                )
            }
            {
                student && studentClasses.length > 0 && (
                    <select
                        value={selectedClass || ""}
                        onChange={(e)=> setSelectedClass(e.target.value)}
                        className='rounded px-2 py-1 font-medium outline-none  cursor-pointer'
                    >
                        {
                            studentClasses.map((cls)=>(
                                <option key={cls._id} value={cls.classId}>
                                    {cls.classId}
                                </option>
                            ))
                        }
                    </select>
                )
            }
            <button onClick={logout} className='bg-red-400 text-white font-medium cursor-pointer px-4 py-1.5 rounded-2xl'>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Navbar