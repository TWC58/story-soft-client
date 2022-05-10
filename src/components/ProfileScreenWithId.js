import { useContext, useEffect, useState } from 'react';
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
import ImageListItem from '@mui/material/ImageListItem';
import { AddBox, Biotech, Unpublished } from '@mui/icons-material';
import CssBaseline from '@mui/material/CssBaseline';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MostPopular from './MostPopular';
import MostRecent from './MostRecent';
import NotPublished from './NotPublished';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Axios from 'axios';
import { Image } from 'cloudinary-react';

const Input = styled('input')({
    display: 'none',
});

export default function ProfileScreenWithId() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const profileId = window.location.pathname.substring("/profile/".length);

    useEffect(() => {
        if (!store.profileInfo || store.profileInfo._id != profileId) {
            store.getUserInfo(profileId);
        }
        store.profileInfo ? store.userPosts ? console.log("USER POSTS: ", store.userPosts) : store.getUserPosts(profileId, 'ID') : console.log("NO CURRENT USER");
    })

    console.log(store.profileInfo);

    const theme = useTheme();


    const handleFollow = async () => {
        console.log('following');
        store.followUser(auth.user._id, store.profileInfo._id);
    };

    const handleUnfollow = async () => {
        console.log('unfollowing');
        store.unfollowUser(auth.user._id, store.profileInfo._id);
    };

    return (
        <div className="flex-row" style={{ maxHeight: '90%', maxWidth: '100%', topMargin: '5%', bottomMargin: '5%' }}>
            <div style={{ textAlign: 'center', alignContent: 'center', width: '25%', paddingTop: '5%' }}>
                <div className="image-overlay-container">
                    <img
                        style={{ borderRadius: '50%', height: '300px', width: '300px' }}
                        src={store.profileInfo ? store.profileInfo.profile_pic_url : ""}
                    />
                </div>
                {
                    <Typography variant='h5' sx={{ marginTop: '20px' }}><strong>{store.profileInfo ? store.profileInfo.username : "Username"}</strong></Typography>
                }
                <Typography variant='h7' sx={{ display: 'block', marginTop: '20px' }}><strong>0</strong> Followers</Typography>
                {
                    <Typography className="profile-bio" sx={{ display: 'block', marginTop: '20px', margin: 'auto', marginBottom: '20px' }}>{store.profileInfo ? store.profileInfo.bio : "Example bio"}</Typography>
                }
                {auth.user?.following && store.profileInfo ?
                    Array.from(auth.user.following).includes(store.profileInfo._id) ? //if user is following already
                        <Button variant='contained' sx={{ display: 'block', marginTop: '20px' }} onClick={handleUnfollow}>Unfollow</Button>
                        :
                        <Button variant='contained' sx={{ display: 'block', marginTop: '20px' }} onClick={handleFollow}>Follow</Button>
                    :
                    null
                }
            </div>
            <div style={{ textAlign: 'center', alignContent: 'center', width: '37.5%', maxHeight: '100%', overflowY: 'scroll' }}>
                {store.userPosts ? <MostPopular posts={Array.from(store.userPosts).filter(post => post.published).sort((a, b) => { return b.likes - a.likes})} /> : <h1>NO POSTS YET</h1> }
            </div>
            <div style={{ textAlign: 'center', alignContent: 'center', width: '37.5%', maxHeight: '100%', overflowY: 'scroll' }}>
                {store.userPosts ? <MostRecent posts={Array.from(store.userPosts).filter(post => post.published).sort((a, b) => { return new Date(b.published) - new Date(a.published) })} /> : <h1>NO POSTS YET</h1> }
            </div>
        </div>
        // <Box sx={{backgroundImage: 'public/data/_117883014_gorilla_dianfosseygorillafund1.jpg', backgroundSize: 'contain', borderRadius: '50%', height: '200px', width: '1200px'}}>TEST</Box>
    );

}