import React, { useState } from 'react'
import facultyLogin from '../../assets/facultyLogin.png'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const FacultyLogin = () => {

    const {axios,setFaculty,navigate} = useAppContext()

    const [facultyEmail,setFacultyEmail] = useState("")
    const [facultyPassword,setFacultyPassword] = useState("")

    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/faculty/login',{email:facultyEmail, password:facultyPassword})

            if(data.success){
                setFaculty(true)
                toast.success(data.message)
                navigate('/faculty')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center px-12 py-5 flex-col pt-35'>
        <h1 className='mb-24 text-4xl font-bold'><span className='text-blue-500'>Login</span> for Faculty</h1>
        <div className='flex items-center gap-40'>
            <form onSubmit={onSubmitHandler}>
                <div className='flex gap-17.5 items-center mb-6'>
                    <label className='text-blue-600 font-semibold text-xl'>Email </label>
                    <input value={facultyEmail} onChange={(e)=>setFacultyEmail(e.target.value)} type="text" name="" id="" className='outline-none w-72.5 h-9 border-gray-500 border rounded-xl px-2'/>
                </div>
                <div className='flex gap-7.5 items-center mb-6'>
                    <label className='text-blue-600 font-semibold text-xl'>Password </label>
                    <input value={facultyPassword} onChange={(e)=>setFacultyPassword(e.target.value)} type="password" name="" id="" className='outline-none w-72.5 h-9 border-gray-500 border rounded-xl px-2'/>
                </div>
                <button type='submit' className='cursor-pointer bg-blue-500 px-7 py-2 rounded-xl text-white w-full hover:bg-blue-400'>Login</button>
            </form>
            <div>
                <img src={facultyLogin} alt="" className='w-80'/>
            </div>
        </div>
    </div>
  )
}

export default FacultyLogin