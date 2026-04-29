import React, { useState } from 'react'
import userLogin from '../assets/userLogin.png'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Login = () => {

    const {setStudent,axios,navigate} = useAppContext()

    const [state,setState] = useState('register')

    const [userName,setUserName] = useState("")
    const [regno,setRegNo] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const onSubmitHandler = async (e)=>{
        try {
            e.preventDefault()
            const {data} = await axios.post(`/api/student/${state}`,{name:userName,regno,email,password})
            if(data.success){
                setStudent(data.student)
                toast.success(data.message)
                navigate('/')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
 
  return (
    <div className='flex items-center justify-center px-12 py-5 flex-col pt-35'>
        <h1 className='mb-24 text-4xl font-bold'><span className='text-blue-500'>{state}</span> for Student</h1>
        <div className='flex items-center gap-40'>
            <form onSubmit={onSubmitHandler}>
                { state === "register" && <div className='flex gap-8 items-center mb-6'>
                    <label className='text-blue-600 font-semibold text-xl'>Username </label>
                    <input value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" name="" id="" className='outline-none w-72.5 h-9 border-gray-500 border rounded-xl px-2' required/>
                </div>}
                {
                    state === "register" && <div className='flex gap-14 items-center mb-6'>
                        <label className='text-blue-600 font-semibold text-xl'>Reg No </label>
                        <input value={regno} onChange={(e)=>setRegNo(e.target.value)} type="text" name="" id="" className='outline-none w-72.5 h-9 border-gray-500 border rounded-xl px-2' required/>
                    </div>
                }
                <div className='flex gap-18 items-center mb-6'>
                    <label className='text-blue-600 font-semibold text-xl'>Email </label>
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" name="" id="" className='outline-none w-72.5 h-9 border-gray-500 border rounded-xl px-2' required/>
                </div>
                <div className='flex gap-7.5 items-center mb-6'>
                    <label className='text-blue-600 font-semibold text-xl'>Password </label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="" id="" className='outline-none w-72.5 h-9 border-gray-500 border rounded-xl px-2' required/>
                </div>
                {
                    state === "register" ? 
                    <p className='mb-5'>Already have an account ? <span className='text-blue-500 cursor-pointer' onClick={()=>setState("login")}>login</span></p>
                    : <p className='mb-5'>Don't have an account ? <span className='text-blue-500 cursor-pointer' onClick={()=>setState("register")}>register</span></p>
                }
                <button className='cursor-pointer bg-blue-500 px-7 py-2 rounded-xl text-white w-full hover:bg-blue-400'>{state}</button>
            </form>
            <div>
                <img src={userLogin} alt="" className='w-80'/>
            </div>
        </div>
    </div>
  )
}

export default Login