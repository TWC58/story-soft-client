import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import './App.css';
import { React, useContext } from 'react'
import { Route, Switch } from 'react-router-dom'

import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    HomeScreen,
    HomeWrapper,
    RegisterScreen,
    LoginScreen,
    ProfileScreen,
    WorkspaceScreen,
    PostScreen,
    ModalAlert,
    ModalDelete
} from './components'
import { ThemeProvider } from '@mui/material/styles';
import { storyTheme, comicTheme } from './styling/themes';
import { GlobalStoreContext } from './store/index'

const ThemeWrapper = () => {
    var currentTheme = null;
    const { store } = useContext(GlobalStoreContext);
    store.mediaType === "STORY" ? currentTheme = storyTheme : currentTheme = comicTheme;

    return (
                <ThemeProvider theme = {currentTheme}>
                    <ModalDelete /> 
                    <ModalAlert />           
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={HomeScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/top5list/:id" exact component={WorkspaceScreen} />
                        <Route path="/profile" exact component={ProfileScreen} />
                        <Route path="/post" exact component={PostScreen} />
                    </Switch>
                </ThemeProvider>
    )
}

export default ThemeWrapper;