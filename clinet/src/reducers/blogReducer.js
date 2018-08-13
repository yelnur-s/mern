
import {GET_USER_BLOGS, SET_BLOG, DELETE_USER_BLOGS, UPDATE_BLOG, GET_SINGLE_BLOG} from "../actions/types"

const initialState = {
    blog:  {},
    blogs: [],
    userBlogs: []
}

export default function (state=initialState, action) {

    switch (action.type) {
        case GET_USER_BLOGS:
            return {
                ...state, // spread operator
                userBlogs: action.payload
            }
        case SET_BLOG:
            state.userBlogs.push(action.payload);
            return {
                ...state
            }
        case DELETE_USER_BLOGS:
            state.userBlogs.splice(state.userBlogs.indexOf(action.payload, 1));

            return {
                ...state
            }
        case UPDATE_BLOG:
            // state.userBlogs.splice(state.userBlogs.indexOf(action.payload, 1));
            state.userBlogs[findById(state.userBlogs, action.payload._id)] = action.payload;
            return {
                ...state
            }
        case GET_SINGLE_BLOG:
            state.blog = action.payload;
            return {
                ...state

            }
        default:
            return state;

    }

}


const findById = (arr, id)=>{
    for(var i = arr.length - 1; i >= 0 ; i--)
        if(arr[i]._id==id) return i;
}