import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { editList,getList } from './index'

const EditList = () => {
    
    const navigate = useNavigate()
    const {listId} = useParams()
    // const [list, setList] = useState({})
    
    const [values, setValues] = useState({
        name: "",
        author: "",
        description: ""
    })

    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const {name, author, description} = values

    const [isAvailable, setIsAvailable] = useState(false)

    const enableSubmit = () => {
        const enable = name.length > 0 || author.length > 0 || description.length > 0
        
        if(enable) setIsAvailable(true)
        else setIsAvailable(false)
    }

    
    // const fetchList = () => {
    //     getList(listId)
    //     .then((data)=>{
    //         setList(data[0])
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
    // }


    useEffect(() => {
        enableSubmit()
        // fetchList()
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

        editList(listId,values,token,uid)
        .then((data)=>{
            if(data.success){
                setSuccess(data.message.message)
            } else {
                setError(data.message.message)
            }
            
            setValues({
                ...values,
                name: "",
                author: "",
                description: ""
            })

        })
        .catch((err)=>{
            console.log(err);
        })

          // ! sure about redirect?

          if (window.confirm('Are you sure you want to redirect to Manage List?')) {
            navigate("/admin/manage-list")
          }

    }

  return (
    <div className="mid-content">
        <div className="forms-area">
        <div className="form-group form-fields"> <h1>Edit List</h1> </div>

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
            <input type="text" className="form-control" value={values.name} onChange={handleChange("name")}  id="exampleFormControlInput1" placeholder="List Name" />
          </div>
          <div className="form-group form-fields">
            <input type="text" className="form-control" value={values.author} onChange={handleChange("author")}  id="exampleFormControlInput1" placeholder="List Author" />
          </div>
          <div className="form-group form-fields">
            <textarea className="form-control" id="exampleFormControlTextarea1" value={values.description} onChange={handleChange("description")} placeholder="About this list" rows={5} />
          </div>
          <div className="form-fields">
            <button type="submit" onClick={handleSubmit} disabled={!isAvailable} className="btn btn-success mb-2">Update List</button>
            <button type="submit" onClick={() => navigate('/admin/manage-list')} className="btn btn-warning mx-3 mb-2">Go Back</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditList