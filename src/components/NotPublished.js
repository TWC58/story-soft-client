import { ExploreCard } from './ExploreCard';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useRoutes } from 'react-router-dom';

const NotPublished = ({ posts }) => {
    const theme = useTheme();

    return (
        <>
        <div id="unpublishedSection">
            <Box sx={{fontFamily: 'Arial, sans-serif', bgcolor: theme.palette.primary.main, borderRadius: 5, margin: 5, display: 'flex', width: '90%'}}>
          <Typography sx={{ p: 1, flexGrow: 1}} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center', width: '90%'}} align="center">Unpublished</Typography></Box>
        <List sx={{marginTop: 5, marginRight: 5, marginLeft: 5, width: '90%'}} style={{flexDirection: 'row'}}>
            {posts.map((post, key) => (
                <ExploreCard key={ post._id } post={ post }/>
            ))}
        </List>
        </div>
        </>
    )
}

export default NotPublished;