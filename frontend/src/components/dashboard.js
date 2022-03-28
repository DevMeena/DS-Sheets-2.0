import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { API } from '../api';
import { isAuthenticated } from './auth';
import Lists from './lists/lists';
// import "./master.css"

const Dashboard = () => {

  const [lists, setlists] = useState([])
  const [error, setError] = useState("")

  const uid = isAuthenticated().user.id
  const getLists = (token) => {
    axios.get(`${API}/lists`)
    .then((res)=>{
      console.log("lists are : ");
      console.log(res.data);
      setlists(res.data)
    })
    .catch((err)=>{
      console.log("No lists to display");
      setError("No lists to display")
    })
  }

  useEffect(() => {

    getLists()

  }, [])
  

  return (
    <div className="mid-content">
    <div className='list-top-container' >
      <div className="page-heading-container">
        <h1>All Lists</h1>
      </div>

{
error && <div className="form-group form-fields"> <div class="alert alert-danger form-control" role="alert">
   {error}
</div>
</div>
}

    { lists && lists.map((l)=>(
      <Lists key={l.id} id={l.id} name={l.name} description={l.description} userId={uid} />
    ))}

    </div>
  </div>
  )
};

export default Dashboard;
