import { GoogleLogout } from 'react-google-login';
import AuthContext from '../../auth/index';
import { useContext } from 'react';
import { Button } from '@mui/material';

const clientId = "540240407763-v90k1276kl5v93s6hu5jfc8n42vk1c5b.apps.googleusercontent.com";
const clientSecret = "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";

function Logout() {
    
    const { auth } = useContext(AuthContext);

    const handleLogout = async () => {
        console.log("Logging Out...");
    }

    return (
        <Button>Logout</Button>
    )
};

export default Logout;