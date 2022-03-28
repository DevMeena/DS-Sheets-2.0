import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { isAuthenticated } from "./index"
import Signin from "./signin";

const PrivateRoute = () => {

    return isAuthenticated() ? <Outlet /> : <Navigate to="/signin" /> ;

};

export default PrivateRoute