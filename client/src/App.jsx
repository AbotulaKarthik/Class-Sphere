import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import FacultyLogin from './components/faculty/FacultyLogin'
import FacultyHome from './components/faculty/FacultyHome'
import StudentAssignment from './pages/StudentAssignment'

const App = () => {

  const {student, faculty} = useAppContext()

  const location = useLocation()
  const isLoginPage =
    location.pathname === "/login" ||
    location.pathname === "/faculty/login"

  const showNavbar = (student || faculty) && !isLoginPage

  return (
    <div className='text-default h-screen text-gray-700 bg-white overflow-hidden'>
      {showNavbar && <Navbar />}
      <Toaster />
      <Routes>
        <Route path='/' element={ student ? <Home/> : <Navigate to='/login'/>} />
        <Route path='/login' element={
          student ? <Navigate to='/'/> : <Login/>}
         />
        <Route path='/faculty' element={
          faculty ? <FacultyHome/> : <Navigate to='/faculty/login'/>} 
        />
        <Route path='/faculty/login' element={
          faculty ? <Navigate to='/faculty' /> : <FacultyLogin />
        } />
        <Route path='/assignment/:id' element={<StudentAssignment />} />
      </Routes>
    </div>
  )
}

export default App