import React from 'react'
import {Link} from "react-router-dom"
import "../../App.css"

const NotFound = () => {
  return (
    <section className='page notfound'>
      <div className='content'>
          <img src='/notfound.png' alt='not Found'/>
          <Link to={"/"}>RETURN TO HOME </Link>
      </div>

    </section>
  )
}

export default NotFound