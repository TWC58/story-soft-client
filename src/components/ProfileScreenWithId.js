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
import { useEffect } from 'react';

const Input = styled('input')({
    display: 'none',
});

export default function ProfileScreenWithId() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.getUserInfo(window.location.href.substring(30));
    }, []);

    const profileId = window.location.href.substring(30);
    console.log('profileID: ', profileId);
    const profileOwner = store.profileInfo;
    console.log("Profile: ", profileOwner);
    console.log(profileOwner);

    const theme = useTheme();

    const examplePost = {
        title: 'Example Title',
        author: 'Example Author',
        published: 'Example Published',
        description: 'Example Description',
        likes: '100',
        dislikes: '23',
        imageUrl: 'https://st2.depositphotos.com/3765753/5349/v/600/depositphotos_53491489-stock-illustration-example-rubber-stamp-vector-over.jpg'
    }
    const sampleList = [examplePost, examplePost, examplePost, examplePost, examplePost, examplePost, examplePost];



    return (
        <div className="flex-row" style={{ maxHeight: '90%', maxWidth: '100%', topMargin: '5%', bottomMargin: '5%' }}>
            <div style={{ textAlign: 'center', alignContent: 'center', width: '25%', paddingTop: '5%' }}>
                <div className="image-overlay-container">
                    <img
                        style={{ borderRadius: '50%', height: '300px', width: '300px' }}
                        src={profileOwner.profile_pic_url}
                    />
                </div>
                {
                <Typography variant='h5' sx={{ marginTop: '20px' }}><strong>{profileOwner.username}</strong></Typography>
                }
                <Typography variant='h7' sx={{ display: 'block', marginTop: '20px' }}><strong>0</strong> Followers</Typography>
                {
                        <Typography className="profile-bio" sx={{ display: 'block', marginTop: '20px', margin: 'auto', marginBottom: '20px' }}>{profileOwner.bio}</Typography>
                }
                <Button variant='contained' sx={{ display: 'block', marginTop: '20px' }}>Follow</Button>
            </div>
            <div style={{ textAlign: 'center', alignContent: 'center', width: '37.5%', maxHeight: '100%', overflowY: 'scroll' }}>
                <MostPopular posts={sampleList} />
            </div>
            <div style={{ textAlign: 'center', alignContent: 'center', width: '37.5%', maxHeight: '100%', overflowY: 'scroll' }}>
                <MostRecent posts={sampleList} />
            </div>
        </div>
        // <Box sx={{backgroundImage: 'public/data/_117883014_gorilla_dianfosseygorillafund1.jpg', backgroundSize: 'contain', borderRadius: '50%', height: '200px', width: '1200px'}}>TEST</Box>
    );

}