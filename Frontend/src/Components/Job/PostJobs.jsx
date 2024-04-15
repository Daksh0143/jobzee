import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const PostJobs = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [location, setLocation] = useState("")
  const [salaryFrom, setSalaryfrom] = useState("")
  const [salaryTo, setSalaryTo] = useState("")
  const [fixedSalary, setFixedSalary] = useState("")
  const [salaryType, setSalaryType] = useState("default")
  const { isAuthorized, user } = useContext(Context)
  const navigateTo = useNavigate()


  const handleJobPost = async (e) => {
    e.preventDefault()
    if (salaryType === "Fixed Salary") {
      setSalaryfrom("")
      setSalaryTo("")
    } else if ("Ranged Salary") {
      setFixedSalary("")
    } else {
      setSalaryfrom("")
      setSalaryTo("")
      setFixedSalary("")
    }
    await axios.post("http://localhost:2321/api/v1/job/post",
        { title, category, description, country, city, location, salaryFrom, salaryTo,fixedSalary },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        console.log(res)
        toast.success(res.data.message)
        if(res){
          navigateTo("/job/getAll")
        }
      }).catch((error) => {
        toast.error(error.responce.data.message)
        console.log(error)
      })
  }
  if (!isAuthorized || user.role !== "Employer") {
    navigateTo("/")
  }

  return (
    <>
      <div className='job_post page'>
        <div className='container'>
          <h3>POST NEW JOB</h3>
          <form onSubmit={handleJobPost}>
            <div className='wrapper'>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Job Title' />
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="Mobile App Development">
                  Mobile App Development
                </option>
                <option value="Frontend Web Development">
                  Frontend Web Development
                </option>
                <option value="MERN Stack Development">
                  MERN STACK Development
                </option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">
                  Artificial Intelligence
                </option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">
                  MEAN STACK Development
                </option>
                <option value="MEVN Stack Development">
                  MEVN STACK Development
                </option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <div className='wrapper'>
              <input type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder='Country'
              />
              <input type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder='City'
              />
            </div>
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder='Location'
            />
            <div className='salary_wrapper'>
              <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                <option value="default"></option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {salaryType === "default" ? (<p>Please Provide Salary Type *</p>)
                  : (salaryType === "Fixed Salary" ? (
                    <input type='number'
                      placeholder='Enter Fixed Salary'
                      value={fixedSalary}
                      onChange={(e) => setFixedSalary(e.target.value)} />
                  ) : (
                    <div className='ranged_salary'>
                      <input type='number'
                        placeholder='Salary From'
                        value={salaryFrom}
                        onChange={(e) => setSalaryfrom(e.target.value)}
                      />
                      <input type='number'
                        placeholder='Salary To'
                        value={salaryTo}
                        onChange={(e) => setSalaryTo(e.target.value)}
                      />

                    </div>
                  )
                  )}
              </div>
            </div>
            <textarea
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Description' />
            <button type='submit'>Create Job</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PostJobs