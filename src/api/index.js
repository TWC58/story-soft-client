/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: BACKEND_URL,
});

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const getUserInfo = (id) => api.get(`/auth/getUser/${id}`, id);

export const getLoggedIn = () => api.get(`/auth/getLoggedIn`, { withCredentials: true });
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logout = () => api.post(`/auth/logout`, {withCredentials: true});
export const updateUser = (user) => api.post('/auth/updateUser', user);

//FOLLOW?UNFOLLOW USER API CALLS
export const followUser = (payload) => api.post(`/auth/followUser`, payload);
export const unfollowUser = (payload) => api.post(`/auth/unfollowUser`, payload)

//POST ROUTES
//pass in the mediaType string to pick the type of post being created, use MediaType options in Store index.js
export const createPost = (mediaType) => api.post(`/post/${mediaType}/createpost`);
export const updatePost = (mediaType, id, payload) => api.put(`/post/${mediaType}/updatepost/${id}`, payload);
export const getPost = (mediaType, id) => api.get(`/post/${mediaType}/getpost/${id}`);
/* 
format of the payload for getPosts:
    {
        search: "search string, such as story title or tag, etc."
        searchBy: "AUTHOR"|"TITLE"|"TAG"|"ID"|"NONE" (ID IS AUTHOR ID!!!)
    }
AUTHOR: search by the username of the content creator
TITLE: search by the name of the story
TAG: search for any stories with the given tag (example: "horror")
NONE: returns all posts for the given mediaType
*/
export const getPosts = (mediaType, payload) => api.post(`/post/${mediaType}/getPosts`, payload);
export const deletePost = (mediaType, id) => api.delete(`/post/${mediaType}/deletepost/${id}`);
/*
format of the payload for likePost:
    {
        "like": "LIKE"|"DISLIKE"
    }
sending "LIKE" will like the post, "DISLIKE" will dislike the post
*/
export const likePost = (mediaType, id, payload) => api.post(`/post/${mediaType}/likepost/${id}`, payload);
export const getTags = (mediaType) => api.get(`/post/${mediaType}/getTags`);
//END POST ROUTES

//SECTION ROUTES
export const addSection = (parentSectionId) => api.post(`/post/addSection/${parentSectionId}`);
export const deleteSection = (sectionId) => api.delete(`/post/deleteSection/${sectionId}`);
export const getSection = (sectionId) => api.get(`/post/getSection/${sectionId}`);
export const updateSection = (sectionId, payload) => api.put(`/post/updateSection/${sectionId}`, payload);
//END SECTION ROUTES

const apis = {
    getUserInfo,

    getLoggedIn,
    registerUser,
    loginUser,
    logout,
    updateUser,//store-soft

    createPost,
    updatePost,
    getPost,
    getPosts,
    deletePost,
    likePost,
    getTags,
    addSection,
    deleteSection,
    getSection,
    updateSection,
    followUser,
    unfollowUser,
}

export default apis
