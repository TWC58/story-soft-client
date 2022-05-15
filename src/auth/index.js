import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'
import { GlobalStoreContext } from '../store'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    ERROR: "ERROR",
    ADD_FOLLOWED: "ADD_FOLLOWED",
    REMOVE_FOLLOWED: "REMOVE_FOLLOWED",
    MARK_USER_FOR_DELETION: "MARK_USER_FOR_DELETION",
    UNMARK_USER_FOR_DELETION: "UNMARK_USER_FOR_DELETION",
    DELETE_USER: "DELETE_USER",
    SET_USER_POSTS: "SET_USER_POSTS",
    SET_MEDIA: "SET_MEDIA",
    REFRESH: "REFRESH",
}

export const MediaType = {
    COMIC: "COMIC",
    STORY: "STORY"
}

export const SearchBy = {
    TITLE: "TITLE",
    AUTHOR: "AUTHOR",
    TAG: "TAG"
}

const testUser = {
    username: "TheMcKillaGorilla",
    _id: "123456",
    email: "abc@gmail.com",
    profile_pic_url: "https://i.picsum.photos/id/1064/300/300.jpg?hmac=x2Qoo-SsJIdhmNkLPrIFXDRsuEAd0ITP-T5pwIt_4yY",
    bio: "CS Professor at Stony Brook University and literature lover. Also rank 1 in Starcraft.",
    likes: [],
    dislikes: [],
    followers: [],
    following: [],
    bookmarks: []
}

function AuthContextProvider(props) {

    const { store } = useContext(GlobalStoreContext);
    const authData = JSON.parse(window.localStorage.getItem("story-soft-auth"));

    const [auth, setAuth] = useState({
        // user: null,
        user: null,
        loggedIn: false,
        error: null,
        userMarkedForDeletion: false,
        userPosts: null,
        mediaType: authData?.mediaType ? authData.mediaType : MediaType.STORY,
    });

    const history = useHistory();

    useEffect(() => {
        //authData?.mediaType ? console.log("ALREADY HAVE MEDIA TYPE") : authData.mediaType = MediaType.STORY;
        console.log("authData: ", authData)
        authData?.mediaType ? authReducer({ type: AuthActionType.REFRESH, payload: authData }) : console.log("NO PREVIOUS AUTH STATE IN LOCAL STORAGE");
        if (!auth.loggedIn)
            auth.getLoggedIn();
    }, []);

    useEffect(() => {
        window.localStorage.setItem("story-soft-auth", JSON.stringify({ ...auth, mediaType: auth.mediaType }));
    })

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.LOGIN: {
                console.log(payload);
                return setAuth({
                    ...auth,
                    user: payload.user,
                    loggedIn: true,
                    error: payload.error
                });
            }
            case AuthActionType.LOGOUT: {
                console.log('AuthActionType.LOGOUT triggered...');
                return setAuth({
                    ...auth,
                    user: null,
                    loggedIn: false,
                    error: payload.error
                });
            }
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    ...auth,
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: auth.error
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    ...auth,
                    user: payload.user,
                    loggedIn: true,
                    error: auth.error
                })
            }
            case AuthActionType.ERROR: {
                return setAuth({
                    ...auth,
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: payload.error
                })
            }
            case AuthActionType.ADD_FOLLOWED: {

                return setAuth({
                    ...auth,
                    user: { ...auth.user, following: auth.user.following.concat([payload.followed]) }
                });
            }
            case AuthActionType.REMOVE_FOLLOWED: {
                return setAuth({
                    ...auth,
                    user: { ...auth.user, following: removeItemAll(auth.user.following, payload.unfollowed) }
                });
            }
            case AuthActionType.MARK_USER_FOR_DELETION: {
                return setAuth({
                    ...auth,
                    userMarkedForDeletion: true,
                });
            }
            case AuthActionType.UNMARK_USER_FOR_DELETION: {
                return setAuth({
                    ...auth,
                    userMarkedForDeletion: false,
                });
            }
            case AuthActionType.DELETE_USER: {
                return setAuth({
                    ...auth,
                    isLoggedIn: false,
                    user: null,
                    userMarkedForDeletion: false,
                });
            }
            case AuthActionType.SET_USER_POSTS: {
                return setAuth({
                    ...auth,
                    userPosts: payload,
                })
            }
            case AuthActionType.SET_MEDIA: {
                console.log("SET MEDIA to " + payload.mediaType);
                return setAuth({
                    ...auth,
                    mediaType: payload.mediaType,
                });
            }
            case AuthActionType.REFRESH: {
                console.log("REFRSHING AUTH: ", payload);
                return setAuth(payload);
            }
            default:
                return auth;
        }
    }

    function removeItemAll(arr, value) {
        var i = 0;
        while (i < arr.length) {
            if (arr[i] === value) {
                arr.splice(i, 1);
            } else {
                ++i;
            }
        }
        if (arr.length) return arr;
        return new Array();
    }

    auth.handleMediaSwitch = () => {
        console.log("Handle media switch start: " + auth.mediaType);
        const mType = (auth.mediaType === MediaType.STORY) ? MediaType.COMIC : MediaType.STORY;
        authReducer({
            type: AuthActionType.SET_MEDIA,
            payload: {
                mediaType: mType
            }
        });
        console.log("Handle media switch end: " + auth.mediaType);
    }

    auth.markUserForDeletion = async () => {
        return authReducer({
            type: AuthActionType.MARK_USER_FOR_DELETION,
        });
    }

    auth.unmarkUserForDeletion = async () => {
        return authReducer({
            type: AuthActionType.UNMARK_USER_FOR_DELETION,
        });
    }

    auth.deleteMarkedUser = async () => {
        let res = await api.deleteUser().catch((err) => {
            console.log(err);
        })
        if (res.status == 200) {
            return authReducer({
                type: AuthActionType.DELETE_USER,
            });
        }
    }

    auth.addFollowed = async (payload) => {
        return authReducer({
            type: AuthActionType.ADD_FOLLOWED,
            payload: payload
        });
    }

    auth.removeFollowed = async (payload) => {
        return authReducer({
            type: AuthActionType.REMOVE_FOLLOWED,
            payload: payload
        });
    }

    auth.updateUser = async (user) => {
        const response = await api.updateUser(user).catch((err) => {
            console.log(err);
            return authReducer({
                type: AuthActionType.LOGOUT,
                payload: {
                    error: err
                }
            });
        });
        console.log("Updated USer:", response);
        if (typeof response !== 'undefined' && response.status === 200) {
            return authReducer({
                type: AuthActionType.LOGIN,
                payload: {
                    user: response.data
                }
            });
        }
    }

    auth.guestUser = () => {
        return authReducer({
            type: AuthActionType.GET_LOGGED_IN,
            payload: {
                loggedIn: false,
                user: {
                    username: "guest",
                    firstName: "guest",
                    lastName: "",
                    email: "null@null.com",
                }
            }
        });
    }

    auth.undoGuest = () => {
        return authReducer({
            type: AuthActionType.GET_LOGGED_IN,
            payload: {
                loggedIn: false,
                user: null
            }
        });
    }

    auth.getLoggedIn = async function () {
        console.log("getting logged in");
        const response = await api.getLoggedIn().catch((err) => {
            return authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: false,//TODO back to false
                    user: null//TODO back to null
                }
            });
        });
        if (typeof response !== 'undefined' && response.status === 200) {
            console.log(response);
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: true,
                    user: response.data
                }
            });

        }

    }

    auth.registerUser = async function (userData, store) {
        const response = await api.registerUser(userData).catch((err) => {
            authReducer({
                type: AuthActionType.LOGOUT,
                payload: {
                    user: null,
                    error: err.response.data.errorMessage
                }
            })
            return err.response;
        });
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
    }

    auth.login = async function (userCreds, store) {
        const response = await api.loginUser(userCreds).catch((err) => {
            authReducer({
                type: AuthActionType.LOGOUT,
                payload: {
                    user: null,
                    error: "ERROR: Credentials entered do not match any user."
                }
            })
        });

        if (typeof response !== 'undefined' && response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN,
                payload: {
                    user: response.data.user,
                    error: null
                }
            })
            history.push("/");
        } else {
            authReducer({
                type: AuthActionType.LOGOUT,
                payload: {
                    user: null,
                    error: "ERROR: Credentials entered do not match any user."
                }
            });
        }
    }

    auth.logout = async function () {
        const response = await api.logout();

        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGOUT,
                payload: {
                    error: null
                }
            })
            history.push("/");
        }
    }

    auth.googleLogin = async function () {
        const response = await api.googleLogin();
        if (response.status === 200) {
            auth.getLoggedIn();
        }
    }

    auth.setError = (errorMessage) => {
        authReducer({
            type: AuthActionType.ERROR,
            payload: {
                error: errorMessage
            }
        });
    }

    auth.clearError = () => {
        authReducer({
            type: AuthActionType.ERROR,
            payload: {
                error: null
            }
        });
    }

    auth.userHasLike = (listId) => {
        if (auth.user.likes) {
            for (let i = 0; i < auth.user.likes.length; i++) {
                if (auth.user.likes[i] === listId)
                    return true;
            }
        }

        return false;
    }

    auth.userHasDislike = (listId) => {
        if (auth.user.dislikes) {
            for (let i = 0; i < auth.user.dislikes.length; i++) {
                if (auth.user.dislikes[i] === listId)
                    return true;
            }
        }

        return false;
    }

    auth.handleProfile = (type) => {
        // history.push('/' + type + '/profile');
        history.push('/profile');
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };