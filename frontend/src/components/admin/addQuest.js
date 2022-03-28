import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { addQuest, getLists, getTopics } from './index'

const AddQuest = () => {

    const navigate = useNavigate()

    const [values, setValues] = useState({
        name: "",
        link: "",
        listId: "",
        topicId: ""
    })

    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [listError, setListError] = useState(false) 
    const [topicError, setTopicError] = useState(false) 

    const {name, link, listId, topicId} = values

    const [isAvailable, setIsAvailable] = useState(false)
    const [lists, setLists] = useState([])
    const [topics, setTopics] = useState([])

    const enableSubmit = () => {
        const enable = name.length > 0 && link.length > 0 && listId.length > 0 && topicId.length > 0

        if(enable) setIsAvailable(true)
        else setIsAvailable(false)
    }

    const fetchLists = () => {
        setListError(false)
        getLists()
        .then((data)=>{
          console.log("lists is working");
            console.log(data);
            setLists(data)
        })
        .catch((err)=>{
            setListError(true)
            console.log("Please add some Lists!");
            console.log(err);
            // navigate("/nolist")
        })
    }

    const fetchTopics = () => {
        setTopicError(false)
        getTopics()
        .then((data)=>{
            console.log(data);
            setTopics(data)
        })
        .catch((err)=>{
            console.log("Please add some Topics!");
            setTopicError(true)
            // navigate("/notopic")
            // console.log(err);
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

        addQuest(name, link, listId, topicId, token, uid)
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
            console.log(values);

        })
        .catch((err)=>{
            console.log(err);
        })

    }

  return (
    <div className="mid-content">
        <div className="forms-area">
        <div className="form-group form-fields"> <h1>Add Quest</h1> </div>

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

{
listError && <div className="form-group form-fields"> <div class="alert alert-danger form-control" role="alert">
   {listError}
</div>
</div>
}

          <div className="form-group form-fields">
            <select className="form-control" name="list" value={values.listId} onChange={handleChange("listId")} id="exampleFormControlSelect1">
              <option value=""> Select a List </option>
              {
                  // setListError ? "" : 
                  // Object.keys(lists)
                  lists.map(({id, name})=>(
                    <option key={id} value={name}> {name} </option>
                ))
              }
            </select>
          </div>

          <div className="form-group form-fields">
            <input type="text" className="form-control" value={values.name}  onChange={handleChange("name")} name="questName" id="exampleFormControlInput1" placeholder="Quest Name" />
          </div>
          <div className="form-group form-fields">
            <input type="text" className="form-control" value={values.link}  onChange={handleChange("link")} name="questUrl" id="exampleFormControlInput1" placeholder="Quest URL" />
          </div>

          <div className="form-group form-fields">
            <select className="form-control" name="topics" value={values.topicId} onChange={handleChange("topicId")} id="exampleFormControlSelect1">
              <option value=""> Select a topic </option>
              {
                  // setTopicError ? "" :
                   topics.map((topic)=>(
                      <option key={topic.id} value={topic.name}> {topic.name} </option>
                  ))
              }
            </select>
          </div>

          <div className="form-fields">
            <button type="submit" onClick={handleSubmit} disabled={!isAvailable} className="btn btn-success mb-2">Create Quest</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddQuest