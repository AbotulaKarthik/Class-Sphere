import React from 'react'
import request from '../../assets/request.png'
import searchI from '../../assets/search_icon.svg'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useEffect } from 'react'

const JoinRequests = () => {

  const {axios, selectedClass} = useAppContext()

  const [requests, setRequests] = useState([])
  const [search,setSearch] = useState("")

  const fetchRequests = async ()=> {
    try {
      const {data} = await axios.get(`/api/join/faculty?classId=${selectedClass}`)

      if(data.success){
        setRequests(data.requests)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(()=>{
    if(selectedClass){
      fetchRequests()
    }
  },[selectedClass])

  const handleAction = async (id, action)=>{
    try {
      const {data} = await axios.post('/api/join/handle',{
        requestId: id,
        action
      })

      if(data.success){
        toast.success(data.message)
        fetchRequests()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  /// filter 
  const filteredRequest = requests.filter( req => 
    req.student.name.toLowerCase().includes(search.toLowerCase()) ||
    req.student.regno.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='px-16 py-8'>
      <h1 className='text-red-500 font-semibold text-xl mb-20'>Join Requests for {selectedClass} !</h1>
      <div className='outline-none rounded-2xl px-3 py-1 border-2 border-gray-300 w-62.5 flex items-center'>
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" name="" id="" placeholder='name or regno' className='outline-none'/>
        <img src={searchI} alt="" />
      </div>
      <div className='flex items-center gap-40 w-full'>
        <div className='w-[45%] h-full overflow-y-scroll myDiv'>
          {
            requests.length === 0 ? (
              <p className='text-green-500 font-semibold'>No Pending Requests</p>
            ) : 
              filteredRequest.length === 0 ? (
                <p className='text-red-500 font-semibold'>No matching Requests</p>
            )
            : (
              filteredRequest.map((req,ind)=> (
                <div key={req._id} className='w-full border-2 border-blue-200 px-8 py-4 mb-3 rounded-md flex items-center justify-between'>
                  <p className='bg-red-400 px-2 text-white rounded-full'>{ind+1}</p>
                  <div>
                    <p className='font-semibold text-gray-600'>{req.student.name}</p>
                    <p className='text-blue-500'>{req.student.regno}</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button onClick={()=> handleAction(req._id,"accept")} className='bg-green-500 px-3 py-1 rounded-md text-white cursor-pointer'>
                      Accept
                    </button>
                    <button onClick={()=> handleAction(req._id,"reject")} className='bg-red-500 px-3 py-1 rounded-md text-white cursor-pointer'>
                      Reject
                    </button>
                  </div>
                </div>
              ))
            )
          }
        </div>
        <img src={request} alt="" width={350}/>
      </div>
    </div>
  )
}

export default JoinRequests