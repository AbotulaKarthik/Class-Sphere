import React, {useState, useEffect} from 'react'
import { useAppContext } from '../../context/AppContext'
import team from '../../assets/team.png'
import MemberCard from './MemberCard'
import searchIcon from '../../assets/search_icon.svg'

const AllStudents = () => {

    const {axios, selectedClass} = useAppContext()
    const [students,setStudents] = useState([])

    const [search, setSearch] = useState("")

    const fetchStudents = async ()=>{
        try {
            const {data} = await axios.get(`/api/class/members?classId=${selectedClass}`)
            console.log(data)

            if(data.success){
                setStudents(data.students)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(()=>{
        if(selectedClass){
            fetchStudents()
        }
    },[selectedClass])

    // filter 
    const filteredStudents = students.filter(student => 
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.regno.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className='px-16 py-10'>
        <div className='flex items-center justify-between w-[70%]'>
            <h1 className='text-blue-500 text-2xl font-semibold mb-6'>Members of the Class <span className='text-green-500'>{selectedClass}</span></h1>
            <div className='outline-none rounded-2xl px-3 py-1 border-2 border-gray-300 flex items-center'>
                <input value={search} onChange={(e)=> setSearch(e.target.value)} type="text" name="" id="" placeholder='search with regno or name' className='outline-none'/>
                <img src={searchIcon} alt="" />
            </div>
        </div>
        {
            students.length === 0 ? ( 
                <div className='w-full flex flex-col justify-center items-center h-auto'>
                    <img src={team} alt="" width={500} />
                    <p className='text-center font-semibold text-blue-600'>No Students in the class !</p>
                </div> 
            ) : filteredStudents.length === 0 ? (
                    <p className='text-red-500 font-semibold mt-4'>
                        Student not found in this class
                    </p>
             ) : ( 
                    <div className='w-[70%]'>
                    {
                        filteredStudents.map((member,index)=>(
                            <MemberCard key={member._id} member={member} index={index} setStudents={setStudents}/>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default AllStudents