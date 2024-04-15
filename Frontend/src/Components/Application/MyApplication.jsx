import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import ResumeModel from './ResumeModel'

const MyApplication = () => {
  const [application, setApplication] = useState([])
  const [modelOpen, setModelOpen] = useState(false)
  const [resumeImageUrl, setResumeImageUrl] = useState("")
  const { isAuthorized, user } = useContext(Context)

  const navigateTo = useNavigate()
  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios.get(`http://localhost:2321/api/v1/application/employer/getall`, { withCredentials: true })
          .then((res) => {
            setApplication(res.data.application)
          })
      } else {
        axios.get(`http://localhost:2321/api/v1/application/jobSeeker/getall`, { withCredentials: true })
          .then((res) => {
            setApplication(res.data.application)
          })
      }
    } catch (error) {
      toast.error(error.responce.data.message)
    }
  }, [isAuthorized])

  if (!isAuthorized) {
    navigateTo("/login")
  }

  const deleteApplication = async (id) => {
    try {
      await axios.delete(`http://localhost:2321/api/v1/application/delete/${id}`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message)
          setApplication(prevApps => { prevApps.filter(application => application._id !== id) })
        })

    } catch (error) {
      toast.error(error.responce.data.message)
    }
  }

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl)
    setModelOpen(true)
  }

  const closeModal = () => {
    setModelOpen(false)
  }

  return (
    <section className='my_application page'>
      {user && user.role === "Job Seeker" ? (
        <div className='container'>
          <h1>My Applications</h1>


          {
            application.length <= 0 ? (
              <>
                {" "}
                <h4>No Applications Found</h4>{" "}
              </>
            ) : (
              application.map((element) => {
                return (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                  />
                );
              })
            )}
        </div>
      ) : (<div className='container'>
        <h3>Applications From Job Seeker</h3>
        {
          application.map((element) => {
            return <EmployerCard element={element} key={element._id} openModal={openModal} />
          })
        }
      </div>)}
      {
        modelOpen && (<ResumeModel imageUrl={resumeImageUrl} onClose={closeModal} />)
      }
    </section>

  )
}

export default MyApplication


const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className='job_seeker_card'>
        <div className='detail'>
          <p><span>Name :</span>
            {element.name}
          </p>
          <p><span>Email :</span>
            {element.email}
          </p>
          <p><span>Phone :</span>
            {element.phone}
          </p>
          <p><span>Address :</span>
            {element.address}
          </p>
          <p><span>Cover Letter :</span>
            {element.coverLetter}
          </p>
        </div>
        <div className='resume'>
          <img src={element.resume.url} alt='resume' onClick={() => openModal(element.resume.url)} />
        </div>
        <div className='btn_area'>
          <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
        </div>
      </div>
    </>
  )
}


const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className='job_seeker_card'>
        <div className='detail'>
          <p><span>Name :</span>
            {element.name}
          </p>
          <p><span>Email :</span>
            {element.email}
          </p>
          <p><span>Phone :</span>
            {element.phone}
          </p>
          <p><span>Address :</span>
            {element.address}
          </p>
          <p><span>Cover Letter :</span>
            {element.coverLetter}
          </p>
        </div>
        <div className='resume'>
          <img src={element.resume.url} alt='resume' onClick={() => openModal(element.resume.url)} />
        </div>

      </div>
    </>

  )
}