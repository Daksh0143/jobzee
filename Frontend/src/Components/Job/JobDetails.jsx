import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Context } from '../../main'
import axios from 'axios'

const JobDetails = () => {
  const { id } = useParams()
  const [job, setJob] = useState({})
  const navigateTo = useNavigate()

  const { isAuthorized, user } = useContext(Context)
  if (!isAuthorized) {
    navigateTo("/login")
  }

  useEffect(() => {
    axios.get(`http://localhost:2321/api/v1/job/getSingle/${id}`, {
      withCredentials: true
    }).then((res) => {
      setJob(res.data.job)
    }).catch((error) => {
      console.log(error.responce.data.json)
    })
  }, [])
  return (
    <>
      <section className='jobDetail page'>
        <div className='container'>
          <h3>JOB DETAILS</h3>

          <div className='banner'>
            <p>
              Title : <span>{job.title}</span>
            </p>
            <p>
              Category : <span>{job.category}</span>
            </p>
            <p>
              Country : <span>{job.country}</span>
            </p>
            <p>
              City : <span>{job.city}</span>
            </p>
            <p>
              Location : <span>{job.location}</span>
            </p>
            <p>
              Description : <span>{job.discription}</span>
            </p>
            <p>
              Job Posted On : <span>{job.jobPostedOn}</span>
            </p>
            <p>
              Salary: {
                job.fixedSalary ? (<span>{job.fixedSalary}</span>) : (<span>
                  {job.salaryFrom} - {job.salaryTo}
                </span>)
              }
            </p>
            <p>
              {user && user.role === "Employer" ? <></> : <Link to={`/application/${job._id}`}>Apply Now</Link>}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default JobDetails