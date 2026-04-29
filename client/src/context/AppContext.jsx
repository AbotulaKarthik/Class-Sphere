import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyTasks } from "../assets/assets.js";
import { dummyMembers } from "../assets/assets.js";

import axios from 'axios'
import { useEffect } from "react";

const AppContext = createContext()

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL

export const AppContextProvider = ({children})=>{

    const navigate = useNavigate()

    const [student,setStudent] = useState(null)
    const [faculty,setFaculty] = useState(null)

    const [members,setMembers] = useState(dummyMembers)

    const [facultyClasses,setFacultyClasses] = useState([])
    const [studentClasses,setStudentClasses] = useState([])
    const [selectedClass,setSelectedClass] = useState(null)


    //// fetch student status, -----------------------
    const fetchuser = async ()=>{
        try {
            const {data} = await axios.get('/api/student/is-auth')
            if(data.success){
                setStudent(data.student)
            }else{
                setStudent(null)
            }
        } catch (error) {
            setStudent(null)
        }
    }
    //// fetch faculty status, --------------------------
    const fetchFaculty = async ()=>{
        try {
            const {data} = await axios.get('/api/faculty/is-auth')
            if(data.success){
                setFaculty(true)
            }
        } catch (error) {
            setFaculty(null)
        }
    }

    ///// fetch the classes of the particular faculty -----------------
    const fetchFacultyClasses = async ()=>{
        try {
            const {data} = await axios.get('/api/class/classes')

            if(data.success){
                setFacultyClasses(data.classes)
                if(data.classes.length>0){
                    setSelectedClass(data.classes[0].classId)
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    //// fetch the classes for the student --------------------
    const fetchStudentClasses = async ()=>{
        try {
            const {data} = await axios.get('/api/class/student')
            if(data.success){
                setStudentClasses(data.classes)
                if(data.classes.length>0){
                    setSelectedClass(data.classes[0].classId)
                }
            }
        } catch (error) {
            setStudentClasses([])
        }
    }

    useEffect(()=>{
        fetchuser()
        fetchFaculty()
    },[])

    useEffect(()=>{
        if(faculty){
            fetchFacultyClasses()
        }
    },[faculty])


    useEffect(()=>{
        if(student){
            fetchStudentClasses()
        }
    },[student])

    const value={
        student,setStudent,axios,navigate,
        faculty,setFaculty,members,
        facultyClasses,selectedClass,setSelectedClass,studentClasses
    }

    return ( 
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}