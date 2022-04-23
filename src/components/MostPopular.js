import { ExploreCard } from './ExploreCard';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';


const MostPopular = ({ posts }) => {
    const theme = useTheme();
    //console.log(posts); 

    return (
        <>
        <div id="mostPopularSection">
        <Box sx={{fontFamily: 'Arial, sans-serif', bgcolor: theme.palette.primary.main, borderRadius: 5, margin: 5, display: 'flex', width: '90%'}}>
          <Typography sx={{ p: 1, flexGrow: 1}} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center', width: '100%'}} align="center">Most Popular</Typography></Box>
        <List sx={{marginTop: 5, marginRight: 5, marginLeft: 5, width: '90%'}} style={{ maxHeight: '100%', overflow: 'auto'}}>
            {posts.map((post, index) => (
                <ExploreCard key={ index } post={ post }/>
            ))}
        </List>
        </div>
        </>
    )
}

export default MostPopular;