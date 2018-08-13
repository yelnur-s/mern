import axios from "axios";
import {GET_ERRORS, GET_USER_BLOGS, SET_BLOG, DELETE_USER_BLOGS, UPDATE_BLOG, GET_SINGLE_BLOG } from "./types";


export  const addBlog = (blogData, showModal) => dispatch => {

    let formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("description", blogData.description);
    formData.append("img", blogData.file);

    console.log(blogData)
    axios({
            method: 'post',
            url: '/api/blog',
            data: formData,
            config: { headers: {'Content-Type': undefined }}
        })
        .then(res=>{

            dispatch({
                type: SET_BLOG,
                payload: res.data
            })

            showModal();

        }).catch(err=>{

                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })


        })
}

export  const updateBlog = (blogData, showModal) => dispatch => {
    let formData = new FormData();
    formData.append("title", blogData.title);
    formData.append("_id", blogData._id);
    formData.append("description", blogData.description);
    formData.append("img", blogData.file);

    axios({
            method: 'put',
            url: '/api/blog',
            data: formData,
            config: { headers: {'Content-Type': undefined }}
        })
        .then(res=>{

            dispatch({
                type: UPDATE_BLOG,
                payload: res.data
            })

            showModal();

        }).catch(err=>{

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })


    })
}


export  const getUserBlog = () => dispatch => {

    axios.get('/api/blog')
        .then(res=>{
            dispatch({
                type: GET_USER_BLOGS,
                payload: res.data
            })
        }).catch(err=>{
            alert(err.response.data);
        })
}



export  const deleteUserBlog = (blogData) => dispatch => {

    axios.delete(`/api/blog/${blogData._id}`)
        .then(()=>{
            dispatch({
                type: DELETE_USER_BLOGS,
                payload: blogData

            })
        }).catch(err=>{
            alert(err.response.data);
        })
}



export  const getSingleBlog = (id) => dispatch => {

    axios.get(`/api/blog/${id}`)
        .then(res=>{
            dispatch({
                type: GET_SINGLE_BLOG,
                payload: res.data

            })
        }).catch(err=>{
        alert(err.response.data);
    })
}