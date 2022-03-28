import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../auth'
import { addList } from './index'

const AddList = () => {

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
        const enable = name.length > 0 && author.length > 0 && description.length > 0

        if(enable) setIsAvailable(true)
        else setIsAvailable(false)
    }
    
    


    useEffect(() => {
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

        addList(name,author,description,token,uid)
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

    }

  return (
    <div className="mid-content">
        <div className="forms-area">
        <div className="form-group form-fields"> <h1>Add List</h1> </div>

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
            <input type="text" className="form-control" value={values.name}  onChange={handleChange("name")} name="listTitle" id="exampleFormControlInput1" placeholder="List Name" />
          </div>
          <div className="form-group form-fields">
            <input type="text" className="form-control"  value={values.author} onChange={handleChange("author")} name="listAuthor" id="exampleFormControlInput1" placeholder="List Author" />
          </div>
          <div className="form-group form-fields">
            <textarea className="form-control" id="exampleFormControlTextarea1" value={values.description}  onChange={handleChange("description")} name="listDescription" placeholder="About this list" rows={5} />
          </div>
          <div className="form-fields">
            <button type="submit" onClick={handleSubmit} disabled={!isAvailable} className="btn btn-success mb-2">Create List</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddList