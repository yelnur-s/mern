import {GET_ERRORS } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const registerUser = (userData, history)=> dispatch => {
    axios.post('/api/user/register', userData)
        .then(res=>history.push('/login'))
        .catch( err => {

            dispatch({
                type: GET_ERRORS,
                payload:  err.response.data
            })
        })
}


export const loginUser = (userData, history)=> dispatch => {
    console.log(userData);
    axios.post('/api/user/login', userData)
        .then(res => {
            console.log(res.data);
            localStorage.setItem("token", res.data.token);
            setAuthToken();

            history.push("/profile");

        })
        .catch( err => {

            dispatch({
                type: GET_ERRORS,
                payload:  err.response.data
            })
        })
}