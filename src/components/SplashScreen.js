import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import AuthContext from '../auth'
import { useContext } from 'react'


export default function SplashScreen() {

    const { auth } = useContext(AuthContext);

    const handleGuest = () => {
        auth.guestUser();
    }
    
    return (
        <div id="splash-screen">
            <span style={{width: '100%', height: '90%', display: 'flex'}}>
                <div style={{display: 'inline-block', height: '100%', width: '60%', paddingLeft: '5%', top: '40%', position: 'relative'}}>
                    <h4 id="main-title" className="splash-title">The Top 5 Lister</h4>
                    <h6 id="sub-title" className="splash-title">A competition of favorites</h6>
                </div>
                <div style={{display: 'inline-block', height: '100%', width: '12%', paddingLeft: '10%', top: '30%', position: 'relative'}}>
                    <Link to='/login/' style={{ display: 'block', marginBottom: '100px', color: 'black', textDecoration: 'underline goldenrod', fontSize: '24pt' }}>Login</Link>
                    <Link to='/register/' style={{ display: 'block', marginBottom: '100px', color: 'black', textDecoration: 'underline goldenrod', fontSize: '24pt' }}>Register</Link>
                    <Link to='/' onClick={handleGuest} style={{ display: 'block', color: 'black', textDecoration: 'underline goldenrod', fontSize: '12pt' }}>Continue As Guest</Link>
                </div>
            </span>
            <div id="third-title" style={{ color: 'rgb(93, 93, 93)', fontSize: '12pt', textAlign: 'center' }}>Upon registering for an account on The Top 5 Lister you will be able to create custom-made lists of your favorites for any top, then <br/> compare your favorites with other's! Or, continue as a guest to view the community's current favorites.</div>
        </div>
    )
    // <Button variant="text" style={{display: 'block', marginBottom: '100px', fontSize: '24pt'}}></Button>
}