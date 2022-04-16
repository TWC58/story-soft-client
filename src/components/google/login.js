import { GoogleLogin } from 'react-google-login';
import AuthContext from '../../auth/index';
import { useContext } from 'react';
import { Button } from '@mui/material';

const clientId = "540240407763-v90k1276kl5v93s6hu5jfc8n42vk1c5b.apps.googleusercontent.com";
const clientSecret = "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";

function Login() {

    const { auth } = useContext(AuthContext);

    const handleLogin = async () => {
        const googleLoginURL = 'http://localhost:5000/auth/google';
        const newWindow = window.open(
            googleLoginURL,
            '_blank',
            'width=500, height=600'
        );
        if (newWindow) {
            var intervalID = setInterval(() => {
                if(newWindow.closed) {
                    console.log('authenticated user');
                    auth.getLoggedIn();
                    if(intervalID) clearInterval(intervalID);
                }
            }, 500);
        }
    };

    return (
        <Button onClick={handleLogin}>Login</Button>
    )
};

export default Login;