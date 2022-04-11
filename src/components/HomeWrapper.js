import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);

    if (auth.user && auth.user.username)
        return <HomeScreen />
    else
        return <SplashScreen />
}