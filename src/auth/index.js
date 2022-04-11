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

function AuthContextProvider(props) {

    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: null
    });
    const history = useHistory();  

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.LOGIN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: payload.error
                });
            }
            case AuthActionType.LOGOUT: {
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
        const response = await api.getLoggedIn().catch((err) => {
            return authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: false,
                    user: null
                }
            });
        });
        if (typeof response !== 'undefined' && response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
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
                if (auth.user.likes[i].listId === listId && auth.user.likes[i].like) 
                    return true;
            }
        } 
        
        return false;
    }

    auth.userHasDislike = (listId) => {
        if (auth.user.likes) {
            for (let i = 0; i < auth.user.likes.length; i++) {
                if (auth.user.likes[i].listId === listId && !auth.user.likes[i].like)
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