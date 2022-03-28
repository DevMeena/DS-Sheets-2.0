import axios from 'axios'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { getLists, getListQuests, deleteQuest } from './index'

const ManageQuest = () => {

    
    const [success, setSuccess] = useState("")

    const [lists, setLists] = useState([])
    const [listQuests, setListQuests] = useState([])
    const [error, setError] = useState("")

    const [values, setValues] = useState({
        listId: ""
    })

    const [isAvailable, setIsAvailable] = useState(false)
    


    const enableSubmit = () => {
            const enable = values.listId.length > 0
    
            if(enable) setIsAvailable(true)
            else setIsAvailable(false)
        }

    const fetchLists = () => {
        getLists()
        .then((data)=>{
            setLists(data)
            // console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    // const fetchListQuests = (lId) => {
    //     getListQuests(lId)
    //     .then((data)=>{
    //         setListQuests(data)
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = event => {

        setError("")
        setListQuests("")

        event.preventDefault()

        getListQuests(values.listId)
        .then((data)=>{

            if(data.success){
                setListQuests(data.message)
            } else {
                setError(data.message.err)
            }

            setValues({
                ...values,
                listId: ""
            })

        })
        .catch((err)=>{
            console.log(err);
        })

    }

    const navigate = useNavigate()
    
    const handleEditClick = (e) => {
        const questId = e.target.value
        navigate(`/admin/edit-quest/${questId}`)
    }

    const handleDeleteClick = (e) => {
        const questId = e.target.value
        setSuccess("");
        setError("");

        const { token } = isAuthenticated()

        const uid = isAuthenticated().user.id
        console.log(uid);

        if (window.confirm('Are you sure you want to delete this Quest?')) {
            deleteQuest(questId,token,uid)
            .then((data)=>{
                if(data.success){
                    setSuccess(data.message.message)
                } else {
                    setError(data.message.message)
                }
                window.location.reload(false)

        })
        .catch((err)=>{
            console.log(err);
        })
          }
    }
    
    useEffect(() => {
        fetchLists()
        enableSubmit()
    },[values,error,success])

  return (

<div className="mid-content">
        <div className="forms-area">
        <div className="heading-form"> <h1>Manage Quests</h1> </div>
        
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

        <form>

          <div className="form-group form-fields">
            <select className="form-control" name="list" onChange={handleChange("listId")} id="exampleFormControlSelect1">
              <option value=""> Select a List </option>
              {
                  lists.map((list)=>(
                      <option key={list.id} value={list.id}> {list.name} </option>
                  ))
              }
            </select>
          </div>

              
          <div className="form-fields">
            <button type="submit" onClick={handleSubmit} disabled={!isAvailable} className="btn btn-success mb-2">Select List</button>
          </div>

        </form>

        <div className="row">
            
            <hr className="topic-hr" />

            {
               listQuests && listQuests.map((quest)=>{
                 
              return <>  <div className="col-lg-6 col-md-6 col-sm-6 col-6 col-divider"> 
                    <h2 className="topic-name"> {quest.name} </h2>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-3 col-divider"> 
                    <button type="button" value={quest.id} onClick={handleEditClick} className="btn btn-success col-12">Edit</button>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-3 col-3 col-divider">
                    <button type="button" value={quest.id} onClick={handleDeleteClick} className="btn btn-danger col-12">Delete</button>
                  </div>
                  <hr className="topic-hr" />
                  </>
             })}

        </div>

      </div>
    </div>

  )
}

export default ManageQuest