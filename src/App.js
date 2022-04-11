import './App.css';
import { React, useContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeScreen,
    HomeWrapper,
    RegisterScreen,
    LoginScreen,
    ProfileScreen,
    WorkspaceScreen,
    ModalAlert,
    ModalDelete
} from './components'
import useStyles from './styling/styles';
import { ThemeProvider } from '@mui/material/styles';
import { storyTheme, comicTheme } from './styling/themes';
import { useState } from 'react';
import ThemeWrapper from './ThemeWrapper';
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
/*
  This is the entry-point for our application. Notice that we
  inject our store into all the components in our application.
  
  @author McKilla Gorilla
*/

const App = () => {

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>  
                    <ThemeWrapper>
                    </ThemeWrapper>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App;