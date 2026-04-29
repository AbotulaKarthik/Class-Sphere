import React from 'react'

const Sidebar = ({active,setActive}) => {
  return (
    <div className='w-70 h-full bg-gray-100 p-4 flex flex-col gap-4'>
        <button onClick={()=> setActive("assignments")} className={`text-left px-3 py-2 rounded cursor-pointer font-medium ${
            active === "assignments" ? "bg-blue-400 text-white" : "hover:bg-gray-200"
        }`}>
            Assignments
        </button>
        <button onClick={()=> setActive("marks")} className={`text-left px-3 py-2 rounded cursor-pointer font-medium ${
            active === "marks" ? "bg-blue-400 text-white" : "hover:bg-gray-200"
        }`}>
            Internal Grading
        </button>
        <button onClick={()=> setActive("request")} className={`text-left px-3 py-2 rounded cursor-pointer font-medium ${
            active === "request" ? "bg-blue-400 text-white" : "hover:bg-gray-200"
        }`}>
            Request to join the Class
        </button>
    </div>
  )
}

export default Sidebar