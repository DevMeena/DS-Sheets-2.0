import React from "react"
import { Outlet, Navigate } from "react-router-dom"
import { isAuthenticated } from "./index"

const AdminRoute = () => {

    const check = isAuthenticated() && isAuthenticated().user.isAdmin == 1;
    return check ? <Outlet /> : <Navigate to="/signin" /> ;

};

export default AdminRoute