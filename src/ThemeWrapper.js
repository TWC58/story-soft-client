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
    ModalDeletePost,
    ProfileScreenWithId,
    ModalDeleteSection
} from './components';
import ComicGen from "./components/comicGen";
import { ThemeProvider } from '@mui/material/styles';
import { storyTheme, comicTheme } from './styling/themes';
import { GlobalStoreContext } from './store/index'
import { LoginSuccess, LoginFailure } from './components/google/loginSuccess';

const ThemeWrapper = () => {
    const { store } = useContext(GlobalStoreContext);
    const currentTheme = store.mediaType === "STORY" ? storyTheme : comicTheme;

    return (
        <ThemeProvider theme={currentTheme}>
            <ModalDeletePost />
            <ModalDeleteSection />
            <ModalAlert />
            <AppBanner />
            <Switch>
                <Route path="/" exact component={HomeScreen} />
                <Route path="/profile" exact component={ProfileScreen} />
                <Route path="/profile/:id" exact component={ProfileScreenWithId} />
                <Route path="/post/:id" exact component={PostScreen} />
                <Route path="/login/success" exact component={LoginSuccess} />
                <Route path='/login/failure' exact component={LoginFailure} />
                <Route path="/comicgen" exact component={ComicGen} />
            </Switch>
        </ThemeProvider>
    )
}

export default ThemeWrapper;