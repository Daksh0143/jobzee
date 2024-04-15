import React from 'react'
import { FaUser, FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'

const HowItWorks = () => {
  return (
    <div className='howitworks'>
      <div className='container'>
        <h3>How JobZee Works</h3>
        <div className='banner'>
          <div className='card'>
            <FaUserPlus/>
            <p>Create Account</p>
            <p>A passionate problem-solver, always learning and collaborating to build the future, one line of code at a time.</p>
          </div>
          <div className='card'>
            <MdFindInPage/>
            <p>Find a Job/Post a Job</p>
            <p>A passionate problem-solver, always learning and collaborating to build the future, one line of code at a time.</p>
          </div>
          <div className='card'>
            <IoMdSend/>
            <p>Create Account</p>
            <p>A passionate problem-solver, always learning and collaborating to build the future, one line of code at a time.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks