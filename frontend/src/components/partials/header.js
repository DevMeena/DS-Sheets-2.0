import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetUserProgress, deleteUserAccount } from '../admin';
import { isAuthenticated, signout } from '../auth';
import "../master.css"

const Header = () => {

  const [isAdmin, setIsAdmin] = useState(0)

  const { token } = isAuthenticated()

  const adminCheck = () => {
    setIsAdmin(isAuthenticated().user.isAdmin)
    console.log(isAdmin);
  }

  useEffect(() => {
    adminCheck()
  }, [isAdmin])
  


  const navigate = useNavigate();

  const logOut = () => {
    signout(() => {
      navigate("/");
    });
  }

  const uid = isAuthenticated().user.id

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete this account?')){
      deleteUserAccount(uid,token)
      .then((data) => {
        console.log(data)
        logOut()
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      console.log("account not deleting");
    }
  }

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset user progress?')){
      resetUserProgress(uid,token)
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      })
    } else {
      console.log("not reseting progress");
    }
  }

  const adminPanel = () => {
    navigate("/admin")
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid navbar-container-fluid">
      <a className="navbar-brand" href="/lists">DSA Sheets</a>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0"> 
        <li className="nav-item dropdown" id="profileicon">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg" width={40} height={40} className="rounded-circle" />
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li onClick={resetProgress} className="dropdown-item">Reset progress</li>
            {/* <li><a className="dropdown-item" href="/change-password">Change password</a></li> */}
            { isAdmin == 1 && <li className="dropdown-item" onClick={adminPanel} >Admin dashboard</li> }
            {/* <li><a className="dropdown-item" href="/forums">Forums</a></li> */}
            <li><hr className="dropdown-divider" /></li>
            <li className="dropdown-item" onClick={logOut} >Log out</li>
            { isAdmin == 0 && <li style={{color: 'red'}} onClick={deleteAccount} className="dropdown-item" >Delete account</li> }
          </ul>
        </li>
      </ul>
      {/* </div> */}
    </div>
  </nav>
  )
};

export default Header;
