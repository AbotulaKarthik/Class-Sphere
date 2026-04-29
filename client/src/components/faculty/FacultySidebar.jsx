import React from 'react'

const FacultySidebar = ({active,setActive}) => {
  return (
    <div className='w-70 h-full bg-gray-100 p-4 flex flex-col gap-4'>
        <button onClick={()=> setActive("assign")} className={`text-left px-3 py-2 rounded cursor-pointer font-medium ${
            active === "assign" ? "bg-blue-400 text-white" : "hover:bg-gray-200"
        }`}>
            Assign Work
        </button>
        <button onClick={()=> setActive("members")} className={`text-left px-3 py-2 rounded cursor-pointer font-medium ${
            active === "members" ? "bg-blue-400 text-white" : "hover:bg-gray-200"
        }`}>
            Students
        </button>
        <button onClick={()=> setActive("evaluate")} className={`text-left px-3 py-2 rounded cursor-pointer font-medium ${
            active === "evaluate" ? "bg-blue-400 text-white" : "hover:bg-gray-200"
        }`}>
            Evaluate Assignment
        </button>
        <button onClick={()=> setActive("marks")} className={`text-left px-3 py-2 rounded cursor-pointer font-medium ${
            active === "marks" ? "bg-blue-400 text-white" : "hover:bg-gray-200"
        }`}>
            Awarded Marks
        </button>
        <button onClick={()=> setActive("joinings")} className={`text-left px-3 py-2 rounded cursor-pointer font-medium ${
            active === "joinings" ? "bg-blue-400 text-white" : "hover:bg-gray-200"
        }`}>
            Join Requests
        </button>
        <button onClick={()=> setActive("createClass")} className={`text-left px-3 py-2 rounded cursor-pointer font-medium ${
            active === "createClass" ? "bg-blue-400 text-white" : "hover:bg-gray-200"
        }`}>
            Create Class
        </button>
    </div>
  )
}

export default FacultySidebar