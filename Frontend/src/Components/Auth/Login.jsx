import React, { useContext, useState } from 'react'
import { Context } from "../../main"
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, Navigate } from 'react-router-dom'
import {  FaPencilAlt, FaRegUser, } from 'react-icons/fa'
import { MdOutlineMailOutline } from 'react-icons/md'
import { FaPhoneFlip } from 'react-icons/fa6'
import { RiLock2Fill } from 'react-icons/ri'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context)

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:2321/api/v1/user/login",
        { email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (isAuthorized) {
    return (
      <Navigate to={"/"} />
    )
  }
  return (
    <div className='authPage'>
      <div className='container'>
        <div className='header'>
          <img src='/JobZeelogo.png' alt='logo' />
          <h3>Login to Your Account </h3>
        </div>
        <form>
          <div className='inputTag'>
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value=""> Select a Role </option>
                <option value="Employer"> Employer </option>
                <option value="Job Seeker"> Job Seeker </option>
              </select>
              <FaRegUser />
            </div>
          </div>
          <div className='inputTag'>
            <label>Email Address</label>
            <div>
              <input type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='xyz@gmail.com' />
              <MdOutlineMailOutline />
            </div>
          </div>
          <div className='inputTag'>
            <label>Password</label>
            <div>
              <input type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='*****' />
              <RiLock2Fill />
            </div>
          </div>
          <button type='submit' onClick={handleLogin} >Login</button>
          <Link to={"/register"}>Register Now</Link>
        </form>
      </div>
      <div className='banner'>
        <img src='/login.png' alt='login' />
      </div>
    </div>
  )
}

export default Login