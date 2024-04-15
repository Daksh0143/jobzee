import React, { useContext } from 'react'
import { Context } from "../../main"
import { Link } from 'react-router-dom'
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa"
import { RiInstagramFill } from "react-icons/ri"

const Footer = () => {
  const { isAuthorized } = useContext(Context)
  return (
    <footer className={isAuthorized ? "footerShow " : "footerHide"}>
      <div>&copy; ALL Rights are reserved by Me</div>
      <div>
        <div><Link to={"/"} target='_blank'><FaFacebookF /></Link></div>
        <div><Link to={"/"} target='_blank'><FaYoutube /></Link></div>
        <div><Link to={"/"} target='_blank'><FaLinkedin /></Link></div>
        <div><Link to={"/"} target='_blank'><RiInstagramFill /></Link></div>
      </div>
    </footer>
  )
}

export default Footer