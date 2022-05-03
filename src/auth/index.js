import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from '../api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    GET_LOGGED_IN: "GET_LOGGED_IN",
    REGISTER_USER: "REGISTER_USER",
    ERROR: "ERROR"
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

    const [auth, setAuth] = useState({
        // user: null,
        user: null,
        loggedIn: false,
        error: null
    });
    const history = useHistory();  

    useEffect(() => {
        if (!auth.loggedIn)
            auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.LOGIN: {
                console.log(payload);
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: payload.error
                });
            }
            case AuthActionType.LOGOUT: {
                console.log('AuthActionType.LOGOUT triggered...');
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error
                });
            }
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: auth.error
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: auth.error
                })
            }
            case AuthActionType.ERROR: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    error: payload.error
                })
            }
            default:
                return auth;
        }
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

    auth.registerUser = async function(userData, store) {
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

    auth.login = async function(userCreds, store) {
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

    auth.logout = async function() {
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

    auth.googleLogin = async function() {
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