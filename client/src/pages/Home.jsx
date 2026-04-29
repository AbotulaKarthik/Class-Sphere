import React, { useContext, useState } from 'react'
import todo from '../assets/todo.png'
import { useAppContext } from '../context/AppContext'
import TaskBox from '../components/TaskBox'
import Sidebar from '../components/Sidebar'
import Marks from './Marks'
import RequestToJoin from '../components/RequestToJoin'
import { dummyTasks } from '../assets/assets.js'
import { useEffect } from 'react'

const Home = () => {

    const {student, selectedClass, axios} = useAppContext()
    const [active,setActive] = useState("assignments")
    const [assignments,setAssignments] = useState([])

    useEffect(()=>{
        if(!selectedClass) return

        const fetchAssignments = async ()=> {
            const {data} = await axios.get(`/api/assignment/class?classId=${selectedClass}`)
            console.log("assignment API response: ",data)
            if(data.success){
                setAssignments(data.assignments)
            }
        }
        fetchAssignments()
    },[selectedClass])

  return (
    <div className='flex h-screen overflow-hidden'>
        <Sidebar active={active} setActive={setActive} />

        <div className='overflow-y-hidden flex-1'>
            <h1 className='text-3xl font-semibold text-gray-700 mx-8 mt-10'>Hello <span className='text-blue-500'>{student.regno} !</span></h1>
            {
                active === 'assignments' && (
                    assignments.length === 0 ? 
                    <div className='w-full h-full flex flex-col gap-5 items-center justify-center pb-30'>
                        <img src={todo} alt="" className='w-60' />
                        <h2 className='text-xl text-blue-600 font-medium'>No Tasks yet !</h2>
                    </div> 
                    : (
                        <div className='pt-6 px-6 flex flex-col gap-4 w-full overflow-y-auto'>
                            <h1 className='font-semibold text-green-500 text-xl'>Here are your Assignments !</h1>
                            {
                                assignments.map((assignment,index)=>(
                                    <TaskBox assignment={assignment} index={index} key={assignment._id}/>
                                ))
                            }
                        </div>
                    )
                )
            }
            {active === "marks" && <Marks/>}
            {active === "request" && <RequestToJoin />}
        </div>
    </div>
  )
}

export default Home