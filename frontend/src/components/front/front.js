import React, { useState, useEffect } from 'react';
import './front.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { API } from '../../api';

const Front = () => {
  
    const [totalUsers, setTotalUsers] = useState(0)
    const navigate = useNavigate()


    const fetchAllUsers = () => {
      axios.get(`${API}/users`)
      .then((data)=>{
        setTotalUsers(data.data.userCount)
      })
      .catch((err)=>{
        console.log("Error in fetching Total User count");
      })
    }

    useEffect(() => {

      fetchAllUsers();

    }, [totalUsers])
    

    const navigateSignIn = () => {
      navigate("/signin")
    }
    
    const navigateSignUp = () => {
      navigate("/signup")
    }

    return (
    <div className='front-body'>
    <div className="body-content">
      <div><i className="fa fa-laptop fa-10x" aria-hidden="true"></i></div>
      <br/>
      <h1 className='project-title'> DSA Sheets </h1>
      <h2>Ace your coding interviews with ease!</h2>
      <br/>
      <h4> Total Registered Users: { totalUsers }  </h4>
      <br/>
      <button type="button" className="btn btn-warning btn-lg front-buttons" onClick={navigateSignIn}>sign in</button>
      <button type="button" className="btn btn-warning btn-lg front-buttons" onClick={navigateSignUp}>sign up</button>
    </div>
    </div>
  )
};

export default Front;
