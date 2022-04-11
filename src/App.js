import './App.css';
import { React } from 'react'
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
    
    const theme = comicTheme; //use story theme for now

    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>  
                    <ThemeProvider theme = {theme}>
                    <ModalDelete /> 
                    <ModalAlert />           
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={HomeScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/top5list/:id" exact component={WorkspaceScreen} />
                        <Route path="/profile" exact component={ProfileScreen} />
                    </Switch>
                    {/* <Statusbar /> */}
                    </ThemeProvider>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App