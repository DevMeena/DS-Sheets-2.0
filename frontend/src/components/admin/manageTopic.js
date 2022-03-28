import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { getTopics, deleteTopic } from './index'

const ManageTopic = () => {

  
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

    const [topics, setTopics] = useState([])
    const navigate = useNavigate()

    const fetchTopics = () => {
        getTopics()
        .then((data)=>{
            setTopics(data)
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleEditClick = (e) => {
      const topicId = e.target.value
      navigate(`/admin/edit-topic/${topicId}`)
  }

  const handleDeleteClick = (e) => {
    const topicId = e.target.value
    setSuccess("");
    setError("");

    const { token } = isAuthenticated()

        const uid = isAuthenticated().user.id
        console.log(uid);

    if (window.confirm('Are you sure you want to delete this Topic?')) {
        deleteTopic(topicId,token,uid)
        .then((data)=>{
          if(data.success){
            setSuccess(data.message.message)
        } else {
            setError(data.message.message)
        }
    })
    .catch((err)=>{
        console.log(err);
    })
      }
}
    
    useEffect(() => {
        fetchTopics()
    },[success,error])

  return (

    <div className="mid-content">
              <div className="container">
                <div className="heading-form"> <h1>Manage Topics</h1> </div>
                {

success && <div className="form-group form-fields"> <div class="alert alert-success form-control" role="alert">
    {success}
</div>
</div>
}

{
error && <div className="form-group form-fields"> <div class="alert alert-danger form-control" role="alert">
   {error}
</div>
</div>
}
                <div className="row">
                  <hr className="topic-hr" />

        {
             topics.map((topic)=>{
                 
              return <>  <div className="col-lg-6 col-md-6 col-sm-6 col-6 col-divider"> 
                    <h2 className="topic-name"> {topic.name} </h2>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-3 col-divider"> 
                    <button type="button" value={topic.id} onClick={handleEditClick} className="btn btn-success col-12">Edit</button>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-3 col-divider">
                    <button type="button" value={topic.id} onClick={handleDeleteClick} className="btn btn-danger col-12">Delete</button>
                  </div>
                  <hr className="topic-hr" />
                  </>
             })}
        </div>
              </div>
      </div>
  )
}

export default ManageTopic