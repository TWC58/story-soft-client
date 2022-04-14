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
import NotPublished from './NotPublished';
import { useTheme } from '@mui/material/styles';

export default function ProfileScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [editActive, setEditActive] = useState(false);
    const [bio, setBio] = useState(auth.user.bio);
    const [profileImage, setProfileImage] = useState(auth.user.profile_pic_url);
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

    const handleEditProfile = () => {
        if (editActive)
            handleSave();
        setEditActive(!editActive);
    }

    const handleSave = () => {
        //update the users info on the server with the entered info
        auth.updateUser({
            id: auth.user._id,
            username: auth.user.username,
            profile_pic_url: profileImage,
            bio: bio
        });
    }

    const handleDiscard = () => {
        setBio(auth.user.bio);
        setProfileImage(auth.user.profile_pic_url);
        setEditActive(!editActive);
    }

    const handleBioChange = (e) => {
        setTempBio(e.target.value);
    }

    return (
        <div className="flex-row" style={{maxHeight: '90%', maxWidth: '100%', topMargin: '5%', bottomMargin: '5%'}}>
            <div style={{textAlign: 'center', alignContent: 'center', width: '25%', paddingTop: '5%'}}>
                <div className="image-overlay-container">
                    <img
                        style={{borderRadius: '50%', height: '300px', width: '300px'}}
                        src={profileImage}
                        srcSet={profileImage}
                    />
                    {
                        editActive ?
                        <button className="image-overlay-button">Edit Image</button>
                        : ""
                    }
                </div>
                <Typography variant='h5' sx={{marginTop: '20px'}}><strong>{auth.user.username}</strong></Typography>
                <Typography variant='h7' sx={{display: 'block', marginTop: '20px'}}><strong>{auth.user.followers.length}</strong> Followers</Typography>
                {
                    editActive ? 
                        <TextareaAutosize
                        maxRows={4}
                        defaultValue={bio}
                        style={{ width: 200, display: 'block' }}
                        className="profile-bio"
                        onChange={handleBioChange}
                        /> :
                        <Typography className="profile-bio" sx={{display: 'block', marginTop: '20px', margin: 'auto', marginBottom: '20px'}}>{bio}</Typography>
                }
                {
                    editActive ? 
                    <Button onClick={handleDiscard} variant='contained' sx={{display: 'block', marginTop: '20px'}}>Discard</Button>
                    : ""
                }
                <Button onClick={handleEditProfile} variant='contained' sx={{display: 'block', marginTop: '20px'}}>{editActive ? "Save" : "Edit Profile"}</Button>
            </div>
            <div style={{textAlign: 'center', alignContent: 'center', width: '37.5%', maxHeight: '100%', overflowY: 'scroll'}}>
                <MostPopular posts={sampleList}/>
            </div>
            <div style={{textAlign: 'center', alignContent: 'center', width: '37.5%', maxHeight: '100%', overflowY: 'scroll'}}>
                <NotPublished posts={sampleList}/>
            </div>
        </div>
        // <Box sx={{backgroundImage: 'public/data/_117883014_gorilla_dianfosseygorillafund1.jpg', backgroundSize: 'contain', borderRadius: '50%', height: '200px', width: '1200px'}}>TEST</Box>
    );

}