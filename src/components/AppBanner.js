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
import { MediaType } from '../store/index'
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
        console.log("MEDIA SWITCH HIT");
        auth.handleMediaSwitch();
        store.handleMediaSwitch();
    }

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfile = async () => {
        auth.handleProfile(auth.mediaType);
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
        <Menu sx={{flex: '1', flexDirection: 'row'}}
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
        <Menu sx={{flex: '1', flexDirection: 'row'}}
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
            <MenuItem onClick={handleProfile}>Profile</MenuItem><br></br>
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
        if (auth.loggedIn && auth.user) {
            //need to show user initials
            return <img
                style={{ borderRadius: '50%', height: '50px', width: '50px' }}
                src={auth.user.profile_pic_url}
            />;
        }
        return <AccountCircle style={{ marginLeft: 5 }} sx={{ color: '#FF6D00', fontSize: 48 }} />;
    }

    function handleLogoClick() {
        store.goHome();
    }

    let newPostButton = (auth.loggedIn) ?
        <CreatePostButton /> :
        "";

    console.log("Media type is story: ", auth.mediaType === MediaType.STORY);
    console.log("Media type is comic: ", auth.mediaType === MediaType.COMIC);

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
                                auth.mediaType === MediaType.STORY ?
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
                        {   (!store.currentPost) ?
                            <Button style={{ margin: 10 }} sx={{paddingRight: '5%'}} variant='contained' onClick={handleMediaSwitch}>
                            {
                                auth.mediaType === MediaType.STORY ?
                                "Go to Comic" : 
                                "Go to Story"
                            }
                            </Button> 
                            :
                            ""
                        }
                        <Box style={{ marginRight: 20 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
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