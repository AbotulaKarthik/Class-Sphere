import React, { useState } from 'react'
import searchIcon from '../assets/search_icon.svg'
import req from '../assets/req.png'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const RequestToJoin = () => {

    const {axios} = useAppContext()

    const [search,setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [results,setResults] = useState([])

    ///// search for the classID -------------------------------------
    const searchClass = async ()=>{
        try {
            if(!search){
                setResults([])
                return
            }

            const {data} = await axios.get(`api/class/search?classId=${search}`)

            if(data.success){
                setResults(data.classes)
            }

        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=>{
        const delay = setTimeout(()=>{
            searchClass()
        },400)

        return ()=> clearTimeout(delay)
    },[search])

    ///// send request for the class ID ---------------------------------------------
    const sendRequest = async (classId)=>{
        try {
            setLoading(true)
            
            const {data} = await axios.post('/api/join/send',{
                classId: classId
            })

            if(data.success){
                toast.success(data.message)
                setSearch("")
                setResults([])
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error sending request")
        }finally {
            setLoading(false)
        }
    }

  return (
    <div className='px-16 mt-8'>
        <h1 className='text-blue-500 font-semibold text-[18px] mb-4'>Search for the Class with the classID to JOIN !</h1>
        <div className='flex items-center justify-between border-2 border-gray-400 w-93.75 px-4 py-1 rounded-2xl mb-8'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" name="" id="" placeholder='AP2025...' className='outline-none' />
            <img src={searchIcon} alt="" />
        </div>

        {
            results.length > 0 && (
                <div className='space-y-3'>
                    {
                        results.map((cls)=>(
                            <div key={cls._id} className='border-2 border-blue-200 px-6 py-4 rounded-md flex items-center justify-between'>
                                <p className='text-blue-600 font-semibold'>{cls.classId}</p>
                                <button onClick={()=> sendRequest(cls.classId)} disabled={loading} className='bg-green-500 text-white px-4 py-1 rounded-md cursor-pointer hover:bg-green-600'>
                                    {loading ? "Sending..." : "Send Request" }
                                </button>
                            </div>
                        ))
                    }
                </div>
            )
        }

        {
            !search && (
                <div>
                    <img src={req} alt="" width={400}/>
                </div>
            )
        }

        {
            search && results.length === 0 && (
                <p className='text-red-400 mt-4 font-semibold'>
                    No Class Found
                </p>
            )
        }
    </div>
  )
}

export default RequestToJoin