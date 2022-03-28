import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { editQuest, getLists, getTopics } from './index'

const EditQuest = () => {

    const navigate = useNavigate()
    const { questId } = useParams()

    const [values, setValues] = useState({
        name: "",
        link: "",
        listId: "",
        topicId: ""
    })

    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const {name, link, listId, topicId} = values

    const [isAvailable, setIsAvailable] = useState(false)
    const [lists, setLists] = useState([])
    const [topics, setTopics] = useState([])

    const enableSubmit = () => {
        const enable = name.length > 0 || link.length > 0 || listId.length > 0 || topicId.length > 0

        if(enable) setIsAvailable(true)
        else setIsAvailable(false)
    }

    const fetchLists = () => {
        getLists()
        .then((data)=>{
            setLists(data)
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

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

    useEffect(() => {
        fetchLists()
        fetchTopics()
        enableSubmit()
    }, [values])

    const handleChange = name => event => {
        setValues({...values, [name]: event.target.value})
    }

    const handleSubmit = event => {

        setSuccess("")
        setError("")

        event.preventDefault()

        const { token } = isAuthenticated()

        const uid = isAuthenticated().user.id
        console.log(uid);

        editQuest(questId,values,token,uid)
        .then((data)=>{
            if(data.success){
                setSuccess(data.message.message)
            } else {
                setError(data.message.message)
            }
            
            setValues({
                ...values,
                name: "",
                link: "",
                listId: "",
                topicId: ""
            })

        })
        .catch((err)=>{
            console.log(err);
        })

           // ! sure about redirect?

           if (window.confirm('Are you sure you want to redirect to Manage Quest?')) {
            navigate("/admin/manage-quest")
          }

    }

  return (
    <div className="mid-content">
        <div className="forms-area">
        <div className="form-group form-fields"> <h1>Edit Quest</h1> </div>

        <form>

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

          <div className="form-group form-fields">
            <select className="form-control" name="list" value={values.listId} onChange={handleChange("listId")} id="exampleFormControlSelect1">
              <option value=""> Select a List </option>
              {
                  lists.map((list)=>(
                      <option key={list.id} value={list.id}> {list.name} </option>
                  ))
              }
            </select>
          </div>

          <div className="form-group form-fields">
            <input type="text" className="form-control" value={values.name} onChange={handleChange("name")} name="questName" id="exampleFormControlInput1" placeholder="Quest Name" />
          </div>
          <div className="form-group form-fields">
            <input type="text" className="form-control" value={values.link} onChange={handleChange("link")} name="questUrl" id="exampleFormControlInput1" placeholder="Quest URL" />
          </div>

          <div className="form-group form-fields">
            <select className="form-control" name="topics" value={values.topicId} onChange={handleChange("topicId")} id="exampleFormControlSelect1">
              <option value=""> Select a topic </option>
              {
                  topics.map((topic)=>(
                      <option key={topic.id} value={topic.id}> {topic.name} </option>
                  ))
              }
            </select>
          </div>

          <div className="form-fields">
            <button type="submit" onClick={handleSubmit} disabled={!isAvailable} className="btn btn-success mb-2">Update Quest</button>
            <button type="submit" onClick={() => navigate('/admin/manage-quest')} className="btn btn-warning mx-3 mb-2">Go Back</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditQuest