import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { ListItem, Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext , LikeType} from '../store'
import AuthContext from '../auth'

export const ExploreCard = ({ post }) => {
    const theme = useTheme();
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const handleViewClick = (e) => {
        store.pushToHistory(`/post/${post._id}`);
    }

    async function handleThumbUp() {
        const success = await store.likePost(post._id, LikeType.LIKE);
        if (success) {
            if (auth.userHasLike(post._id)){
                post.likes--;
            } else {
                post.likes++;
            }

            if (auth.userHasDislike(post._id)) {
                post.dislikes--;
            }

            auth.getLoggedIn();
        }
    }

    async function handleThumbDown() {
        const success = await store.likePost(post._id, LikeType.DISLIKE);
        if (success) {
            if (auth.userHasDislike(post._id)){
                post.dislikes--;
            } else {
                post.dislikes++;
            }

            if (auth.userHasLike(post._id)) {
                post.likes--;
            }
            
            auth.getLoggedIn();
        }
    }

    return (
        <>
            <ListItem sx={{ bgcolor: theme.palette.primary, borderRadius: 0, display: 'flex', width: '100%', position: 'relative' }}>
                <Box sx={{ fontFamily: 'Arial, sans-serif', backgroundColor: theme.palette.primary.light, borderRadius: 5, width: '100%', display: 'inline', p: 1 }} style={{ cursor: 'pointer' }}>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{post.name}</Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{post.userData.username}</Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{post.published}</Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{post.summary}</Box>
                    <Box sx={{ height: '95%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton onClick={handleThumbUp}>
                                    <ThumbUpOffAltIcon sx={{fontSize:'24pt'}} disabled={!auth.user || !auth.loggedIn || !post.published} color={(auth.user && auth.userHasLike(post._id)) ? "secondary" : "default"} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {post.likes}
                            </span>
                            <span>
                                <IconButton onClick={handleThumbDown}>
                                    <ThumbDownOffAltIcon sx={{fontSize:'24pt'}} disabled={!auth.user || !auth.loggedIn || !post.published} color={(auth.user && auth.userHasDislike(post._id)) ? "secondary" : "default"} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {post.dislikes}
                            </span>
                            <span>
                                {post.published ?
                                    <Button onClick={handleViewClick}>View</Button>
                                :
                                    <Button onClick={handleViewClick}>Edit</Button>
                                }
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>
        </>
    );
};