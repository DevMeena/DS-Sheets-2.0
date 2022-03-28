import Axios from 'axios'
import { API } from '../../api';

export const signup = async (username, password) => {

    try {
        const response = await Axios.post(`${API}/signup`, {username: username, password: password})
        return response.data;

      } catch (err) {
        const message = err.response.data
        return {error: message}
      }

}

export const signin = async (username, password) => {

    try {
        const response = await Axios.post(`${API}/signin`, {username: username, password: password})
        return response.data;

      } catch (err) {
        const message = err.response.data
        return {error: message}
      }

}

export const authenticate = (data, next) => {
    if(typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window === undefined) {
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}


export const signout = next => {
    if(typeof window !== undefined) {
        localStorage.removeItem("jwt")
        next()

        return Axios.get(`${API}/signout`)
        .then(response => {
            console.log("signout success");
        })
        .catch(err => {
            console.log(err);
        })
    }
}