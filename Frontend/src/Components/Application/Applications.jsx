import React, { useContext, useState } from 'react'
import { Context } from "../../main"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const Applications = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [coverLetter, setCoverLetter] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [resume, setResume] = useState(null)
  const { isAuthorized, user } = useContext(Context)
  const navigateTo = useNavigate()

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume)
  }

  const { id } = useParams();

  const handleApplication = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name)
    formData.append("email", email)
    formData.append("phone", phone)
    formData.append("address", address)
    formData.append("coverLetter", coverLetter)
    formData.append("resume", resume)
    formData.append("jobId", id)

    try {
      const { data } = await axios.post(`http://localhost:2321/api/v1/application/post`, formData, {
        withCredentials:true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setName("")
      setEmail("")
      setPhone("")
      setAddress("")
      setCoverLetter("")
      setResume("")
      toast.success(data.message)
      navigateTo("/job/getAll")
    } catch (error) {
      toast.error(error.responce.data.message)
    }
  };
  if (!isAuthorized || user && user.role === "Employer") {
    navigateTo("/")
  }

  return (
    <section className='application'>
      <div className='container'>
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input type='text'
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)} />
          <input type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <input type='number'
            placeholder='Enter a phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)} />
          <input type='text'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)} />
          <textarea
            rows="10"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder='Cover Letter'
          />
          <div>
            <label style={{ textAlign: "start", display: "block", fontSize: "20px" }}>
              Select Resume
            </label>
            <input type='file'
              accept='.jpg,.jpeg,.webp,.png'
              onChange={handleFileChange}
              style={{width:"100%"}} />
          </div>
          <button type='submit'>Send Application</button>
        </form>
      </div>
    </section>
  )
}

export default Applications