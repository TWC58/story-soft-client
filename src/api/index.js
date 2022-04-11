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
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE CALL THE payload, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createTop5List = (payload) => api.post(`/top5list/`, payload)
export const getMyTop5Lists = () => api.get(`/mytop5lists`)
export const getAllPublishedTop5Lists = () => api.get(`/publishedtop5lists`)
export const getAllTop5Lists = () => api.get(`/top5lists/`)
export const getTop5ListsByUsername = (username) => api.get(`/top5lists/user/${username}`)
export const updateTop5ListById = (id, payload) => api.put(`/top5list/${id}`, payload)
export const deleteTop5ListById = (id) => api.delete(`/top5list/${id}`)
export const getTop5ListById = (id) => api.get(`/top5list/${id}`)
export const getCommunityTop5Lists = () => api.get(`/community/top5lists`);
export const viewList = (id) => api.get(`/top5list/view/${id}`);
export const viewCommunityList = (id) => api.get(`/community/top5list/view/${id}`);
export const likeList = (id, payload) => api.post(`/top5list/like/${id}`, payload);
export const unlikeList = (id, payload) => api.post(`/top5list/unlike/${id}`, payload);

export const getLoggedIn = () => api.get(`/loggedIn/`);
export const registerUser = (payload) => api.post(`/register/`, payload)
export const loginUser = (payload) => api.post(`/login/`, payload)
export const logout = () => api.get(`/logout/`)

export const postComment = (id, payload) => api.post(`/top5list/comment/${id}`, payload);

const apis = {
    createTop5List,
    getMyTop5Lists,
    getAllPublishedTop5Lists,
    getAllTop5Lists,
    getTop5ListsByUsername,
    updateTop5ListById,
    deleteTop5ListById,
    getTop5ListById,
    getCommunityTop5Lists,
    viewList,
    viewCommunityList,
    likeList,
    unlikeList,

    getLoggedIn,
    registerUser,
    loginUser,
    logout,

    postComment
}

export default apis
