import { ExploreCard } from './ExploreCard';
import { GlobalStoreContext } from '../store'
import React, { useContext, useEffect } from 'react'
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Following = ({ posts }) => {
    const { store } = useContext(GlobalStoreContext);
    const theme = useTheme();

    return (
        posts == null ?
            <>
                <div id="followingSection">
                    <Box sx={{ fontFamily: 'Arial, sans-serif', bgcolor: theme.palette.primary.main, borderRadius: 5, margin: 5, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Following</Typography>
                    </Box>
                    <h3 align="center">Please log in to view posts from users you follow.</h3>
                </div>
            </>
            :
            <>
                <div id="followingSection">
                    <Box sx={{ fontFamily: 'Arial, sans-serif', bgcolor: theme.palette.primary.main, borderRadius: 5, margin: 5, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Following</Typography>
                    </Box>
                    <List sx={{ marginTop: 5, marginRight: 5, marginLeft: 5 }} style={{ flexDirection: 'row' }}>
                        {posts.map((post, index) => (
                            <ExploreCard key={index} post={post} />
                        ))}
                    </List>
                </div>
            </>
    )
}

export default Following;