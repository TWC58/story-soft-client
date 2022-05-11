import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext, ListViewMode } from '../store'
import { Fab, ListItem, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import { CenterFocusStrong } from '@mui/icons-material';
import Box from '@mui/material/Box';
import StoryCard from './StoryCard.js'
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Copyright from './Copyright.js'
import useStyles from '../styling/styles'
import Explore from './Explore';
import Following from './Following';
import SearchPosts from './SearchPosts';
import AuthContext from '../auth';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const classes = useStyles();

    useEffect(() => {
        if (store.tagPostArrays === null || store.followingPosts === null) {
            console.log("Loading front page")
            store.loadFrontPageData();
        }
    });

    const examplePost = {
        name: 'Example Title',
        userData: {
            username: 'Example Author',
        },
        published: 'Example Published',
        summary: 'Example Description',
        likes: '100',
        dislikes: '23',
        imageUrl: 'https://st2.depositphotos.com/3765753/5349/v/600/depositphotos_53491489-stock-illustration-example-rubber-stamp-vector-over.jpg'
    }
    
    const sampleExploreListTags1 = { name: 'Example Tag 1', posts: [examplePost, examplePost, examplePost]};
    const sampleExploreListTags2 = { name: 'Example Tag 2', posts: [examplePost, examplePost, examplePost]};
    const sampleExploreListTags3 = { name: 'Example Tag 3', posts: [examplePost, examplePost, examplePost]};
    const sampleFollowingList = [examplePost, examplePost, examplePost, examplePost, examplePost, examplePost, examplePost];
    return (
        <div id="post-selector">
            {/* <div id="homescreen-divider"></div> */}
            {console.log("SEARCH POSTS: " + store.searchPosts)}
            <Explore exploreTags={store.tagPostArrays ? store.tagPostArrays : []}/>

            {
                (store.searchPosts !== null) ? 
                <SearchPosts/>
                :
                store.followingPosts ? <Following posts={store.followingPosts}/> : <Following posts={[]}/> 
            }
        </div>)


}

export default HomeScreen;