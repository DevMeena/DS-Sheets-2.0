import React, {useState, useEffect} from 'react';
import './auth.css'
import { useNavigate } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from './index';

const Signin = () => {

    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const onSubmit = event => {
    event.preventDefault()

      setLoading(true)
      setError(false)
      signin(username,password)
      .then((data)=>{
      if(data.error){
        setError(true)
        setErrorMessage(data.error.err)
      } else {
        authenticate(data, () => {
          console.log(data);
          performRedirect();
        });
      }
    })
    .catch((err)=>{
        setError(true)
        setErrorMessage(err)
    })

      // setUsername("")
      // setPassword("")
      setLoading(false)
    
  }

  const performRedirect = () => {
      navigate('/lists')
  }

  const alreadyAuthenticated = () => {
    if(isAuthenticated()){
      performRedirect()
    }
  }

    useEffect(() => {
      alreadyAuthenticated()
    }, [])
    

    return (
        <div className="container">
        <div className="row outer-area">
          <div className="col-md-6 offset-md-3 my-auto">
            {/* <div className="text-center mb-5 text-dark">Made with bootstrap</div> */}
            <div id='auth-border' className="card my-5">
              <form className="card-body cardbody-color p-lg-5">
                <div className="text-center">
                  {/* <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle" width="200px" alt="profile" /> */}
                  <i class="fa fa-user fa-8x" aria-hidden="true" />
                  <h2 className="text-center text-light auth-title">Welcome Back!</h2>
                </div>
                {
                  error &&
                  <div class="alert alert-danger" role="alert">
                  {errorMessage}
                  </div>
                }
                <div className="mb-3">
                  <input type="text" className="form-control" onChange={(e)=> {setUsername(e.target.value)}} value={username} id="Username" aria-describedby="emailHelp" placeholder="Username" />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" onChange={(e)=> {setPassword(e.target.value)}} value={password} id="password" placeholder="Password" />
                </div>
                <div className="text-center"><button type="submit" onClick={onSubmit} disabled={loading} className="btn btn-color px-5 w-100 button-submit">Sign in</button></div>
                <div id="emailHelp" className="form-text text-center mb-1 mt-1 text-light">Not
                  Registered? <a href="/signup" className="text-warning fw-bold"> Create an
                    Account</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      

      );
};

export default Signin;
