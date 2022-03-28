import React, {useState} from 'react'
import './auth.css'
import { signup } from './index'

const Signup = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const onSubmit = event => {
      event.preventDefault();
      setLoading(true)
      setError(false)
      setSuccess(false)
      signup(username,password)
      .then((data)=>{
        if(data.error){
          setError(true)
          setErrorMessage(data.error.err)
        } else {
          setSuccess(true)
        }
      })
      .catch((err)=>{
          setError(true)
          setErrorMessage(err)
      })

      setUsername("")
        setPassword("")
        setLoading(false)

    }

    return (
        <div className="container">
        <div className="row outer-area">
          <div className="col-md-6 offset-md-3 my-auto">
            <div id='auth-border' className="card my-5">
              <form className="card-body cardbody-color p-lg-5">
                <div className="text-center">
                  {/* <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle" width="200px" alt="profile" /> */}
                  <i class="fa fa-user fa-8x" aria-hidden="true" />
                  <h2 className="text-center text-light auth-title">Hello There!</h2>
                </div>
                {
                  success &&
                  <div class="alert alert-success" role="alert">
                  Account created! <a href="/signin" class="alert-link">sign in here</a>.
                  </div>
                }
                {
                  error &&
                  <div class="alert alert-danger" role="alert">
                  {errorMessage}
                  </div>
                }
                <div className="mb-3">
                  <input type="text" className="form-control" onChange={(e)=> {setUsername(e.target.value)}} value={username} id="Username" placeholder="Username" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" onChange={(e)=> {setPassword(e.target.value)}} value={password} id="password" placeholder="Password" />
                </div>
                <div className="text-center"><button disabled={loading} type="submit" onClick={onSubmit} className="btn btn-color px-5 w-100 button-submit">Sign up</button></div>
                <div id="emailHelp" className="form-text text-center mb-1 mt-1 text-light">Already have an Account? <a href="/signin" className="text-warning fw-bold"> Sign in </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      );
};

export default Signup;
