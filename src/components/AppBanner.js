import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Stack from '@mui/material/Stack';
import SearchToolbar from './SearchToolbar'
import CreatePostButton from './CreatePostButton'
import SvgIcon from '@mui/material/SvgIcon';
import Icon from '@mui/material/Icon';
import Button from "@material-ui/core/Button";
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import MediaType from '../store'
import GoogleLogin from './google/login'
import GoogleLogout from './google/logout'
import { gapi } from 'gapi-script';
import { useEffect } from 'react';

const clientId = "540240407763-v90k1276kl5v93s6hu5jfc8n42vk1c5b.apps.googleusercontent.com";
const clientSecret = "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";

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const theme = useTheme();

    useEffect(() => {
        function start() {
            gapi.client.init({
                client_id: clientId,
                scope: 'https://www.googleapis.com/auth/userinfo.email'
            })
        }
        gapi.load('client:auth2', start);
    });

    const handleMediaSwitch = () => {
        store.handleMediaSwitch();
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = async () => {
        auth.handleProfile(store.mediaType);
    }

    const handleLogout = async () => {
        handleMenuClose();
        await auth.logout();
        store.initState();
    }

    const handleGuest = () => {
        auth.guestUser();
        handleMenuClose();
    }

    const handleUndoGuest = () => {
        auth.undoGuest();
        handleMenuClose();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {
                //TODO must add google signin link below
            }
            <MenuItem onClick={handleUndoGuest}>
                <GoogleLogin />
            </MenuItem>
            {/* <MenuItem onClick={handleUndoGuest}><Link to='/login/'>Login</Link></MenuItem> */}
            {/* {(!auth.user || !auth.user.username ) ? <MenuItem onClick={handleGuest}><Link to='/'>Continue as Guest</Link></MenuItem> : ""} */}

        </Menu>
    );
    const loggedInMenu =
        <Menu sx={{display: 'inline', flex: '1', flexDirection: 'column'}}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}><GoogleLogout /></MenuItem>
        </Menu>

    let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
    }

    const styles = {
        paperContainer: {
            backgroundImage: `url(${Image})`
        }
    };

    function getAccountMenu(loggedIn) {
        if (auth.loggedIn) {
            //need to show user initials
            return <img
                style={{ borderRadius: '50%', height: '50px', width: '50px' }}
                src={auth.user.profile_pic_url}
            />;
        }
        return <AccountCircle sx={{ color: '#FF6D00', fontSize: 48 }} />;
    }

    function handleLogoClick() {
        store.goHome();
    }

    let newPostButton = (auth.loggedIn) ?
        <CreatePostButton /> :
        "";

    return (
        <Stack spacing={0}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" >
                    <Toolbar id="app-banner" style={{ backgroundColor: theme.palette.primary.dark }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="logo"
                            onClick={handleLogoClick}>
                            {
                                store.mediaType === MediaType.STORY ?
                                    <img
                                        style={{ height: '60px', width: '60px' }}
                                        src={`/storyLogo.PNG`}
                                    /> :
                                    <img
                                        style={{ height: '60px', width: '60px' }}
                                        src={`/comicLogo.PNG`}
                                    />
                            }

                        </IconButton>
                        <SearchToolbar />
                        <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box>
                        {/* <Button sx={{paddingRight: '5%'}} variant='contained' onClick={handleMediaSwitch}>
                            {
                                store.mediaType === MediaType.STORY ?
                                "Goto Comic" : 
                                "Goto Story"
                            }
                        </Button> */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {newPostButton}
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                            >
                                {getAccountMenu(auth.loggedIn)}
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
                {
                    menu
                }
            </Box>
        </Stack>
    );

    // <Button sx={{ bgcolor: '#331BD8' }} variant="contained">Contained</Button>
}