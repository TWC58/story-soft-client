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
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Axios from 'axios';
import { Image } from 'cloudinary-react';
import { useEffect } from 'react';
import { getPosts } from '../api';

const Input = styled('input')({
    display: 'none',
});

export default function ProfileScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const [editActive, setEditActive] = useState(false);
    const [bio, setBio] = useState(auth.user ? auth.user.bio : "You don't have a bio; enter one here!");
    const [profileImage, setProfileImage] = useState(auth.user ? auth.user.profile_pic_url : "");// ? auth.user.profile_pic_url : "");
    const [username, setUsername] = useState(auth.user ? auth.user.username : "ExampleUsername");
    //const [userPosts, setUserPosts] = useState(null);
    const theme = useTheme();

    useEffect(() => {
        //TODO load posts by current user, split into published/unpublished, then feed to mostpopular and unpublished components
        auth.user?._id ? store.postsBelongToCurrent ? console.log("POSTS ALREADY BELONG TO CURRENT USER") : store.getUserPosts(auth.user._id, 'ID') : console.log("NO USER");
        auth.user?.username != store.userPosts?.[0].userData.username ? store.getUserPosts(auth.user._id, 'ID') : console.log("POSTS UP TO DATE");
    });

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
    
    const handleDeleteProfile = () => {
        console.log("delete profile modal open triggered")
        auth.markUserForDeletion();
    }

    const handleSave = () => {
        //update the users info on the server with the entered info
        if (profileImage == "") setProfileImage(auth.user.profile_pic_url);
        auth.updateUser({
            id: auth.user._id,
            username: username,
            profile_pic_url: profileImage,
            bio: bio
        });
    }

    const handleDiscard = () => {
        setBio(auth.user.bio);
        setProfileImage(auth.user.profile_pic_url);
        setUsername(auth.user.username);
        setEditActive(!editActive);
    }

    const handleBioChange = (e) => {
        setBio(e.target.value);
    }

    const handleImageChange = async (e) => { //TODO with cloudinary
        const img = e.target.files[0];
        console.log(img);
        const formData = new FormData();
        formData.append("api_key", '');
        formData.append("file", img);
        formData.append("upload_preset", "story-soft");
        Axios.post("https://api.cloudinary.com/v1_1/dkyezrwib/image/upload", formData, { withCredentials: false }).then((response) => {
            console.log(response);
            if (response.status === 200) setProfileImage(response.data.url);
        });
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    return (
        <div className="flex-row" style={{ maxHeight: '90%', maxWidth: '100%', topMargin: '5%', bottomMargin: '5%' }}>
            <div className="flex-container" style={{ textAlign: 'center', alignContent: 'center', width: '25%', paddingTop: '5%' }}>
                <div className="image-overlay-container">
                    <img
                        sx={{p: 3}}
                        style={{ borderRadius: '50%', height: '300px', width: '300px' }}
                        src={profileImage === "" && auth.user ? auth.user.profile_pic_url : profileImage}
                    />
                    {
                        editActive ?
                            <label htmlFor="contained-button-file">
                                <Input onChange={handleImageChange} accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span" sx={{ color: 'red' }}>
                                    Upload Image
                                </Button>
                            </label>
                            : ""
                    }
                </div>
                {
                    editActive ?
                        <TextField required id="username" label="Username" sx={{margin: 2}} defaultValue={auth.user ? auth.user.username : username} onChange={handleUsernameChange} />
                        :
                        <Typography variant='h5' sx={{ marginTop: '20px' }}><strong>{auth.user ? auth.user.username : username}</strong></Typography>
                }
                <Typography variant='h7' sx={{ display: 'block', margin: 1 }}><strong>{auth.user ? auth.user.followers.length : 0}</strong> Followers</Typography>
                {
                    editActive ?
                        <TextareaAutosize
                            maxRows={4}
                            defaultValue={auth.user ? auth.user.bio : bio}
                            style={{ width: 250, display: 'block' }}
                            className="profile-bio"
                            onChange={handleBioChange}
                        /> :
                        <Typography className="profile-bio" sx={{ display: 'block', margin: 'auto' }}>{auth.user ? auth.user.bio : bio}</Typography>
                }
                {
                    editActive ?
                        <Button onClick={handleDiscard} variant='contained' style={{ margin: 10 }} sx={{ display: 'block' }}>Discard</Button>
                        : ""
                }
                
                <Button onClick={handleEditProfile} variant='contained' style={{ margin: 10 }} sx={{ display: 'block', marginTop: '20px' }}>{editActive ? "Save" : "Edit Profile"}</Button>
                { 
                    editActive ? <><br></br><Button style={{ backgroundColor: 'red' }} onClick={handleDeleteProfile} type="button" variant="contained" className="workspace-button"  >Delete Account</Button></> 
                    : ""
                }
            </div>

            <div style={{ textAlign: 'center', alignContent: 'center', width: '37.5%', maxHeight: '100%', overflowY: 'scroll' }}>
                <MostPopular posts={auth.user ? store.userPosts ? Array.from(store.userPosts).filter(x => x.published) : [] : []} />
            </div>
            <div style={{ textAlign: 'center', alignContent: 'center', width: '37.5%', maxHeight: '100%', overflowY: 'scroll' }}>
                <NotPublished posts={auth.user ? store.userPosts ? Array.from(store.userPosts).filter(x => !x.published) : [] : []} />
            </div>
        </div>
        // <Box sx={{backgroundImage: 'public/data/_117883014_gorilla_dianfosseygorillafund1.jpg', backgroundSize: 'contain', borderRadius: '50%', height: '200px', width: '1200px'}}>TEST</Box>
    );

}