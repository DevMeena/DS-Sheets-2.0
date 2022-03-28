import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoListError = () => {

    const navigate = useNavigate()

  return (
    <div className='front-body'>
    <div className="body-content">
      <div>
          <i className="fa fa-exclamation-circle fa-10x" aria-hidden="true"></i>
      </div>
      <br/>
      <h1 className='project-title'> Error 404 </h1>
      <h2> Please Add Some Lists! </h2>
      <button type="button" className="btn btn-warning btn-lg mt-5" onClick={()=>{navigate("/lists")}} >go to dashboard</button>

    </div>
    </div>
  )
}

export default NoListError