import React, { useEffect, useContext } from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Context } from './main'
import Login from "../src/Components/Auth/Login"
import Register from "../src/Components/Auth/Register"
import Navbar from "../src/Components/Layout/Navbar"
import Footer from "../src/Components/Layout/Footer"
import Home from "../src/Components/Home/Home"
import Jobs from "../src/Components/Job/Jobs"
import JobDetails from "../src/Components/Job/JobDetails"
import MyJobs from "../src/Components/Job/MyJobs"
import PostJobs from "../src/Components/Job/PostJobs"
import Applications from "../src/Components/Application/Applications"
import MyApplication from "../src/Components/Application/MyApplication"
import ResumeModel from "../src/Components/Application/ResumeModel"
import NotFound from "../src/Components/NotFound/NotFound"
import axios from "axios"
import { Toaster } from "react-hot-toast"
function App() {

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responce = await axios.get("http://localhost:2321/api/v1/user/getUser", { withCredentials: true })
        setUser(responce.data.user)
        setIsAuthorized(true)
      } catch (error) {
        setIsAuthorized(false)
      }
    }
    fetchUser();
  }, [isAuthorized])




  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/job/getAll' element={<Jobs />} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/job/post' element={<PostJobs />} />
          <Route path='/job/me' element={<MyJobs />} />
          <Route path='/application/:id' element={<Applications />} />
          <Route path='/application/me' element={<MyApplication />} />
          <Route path='*' element={<NotFound />} />


        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  )
}

export default App
