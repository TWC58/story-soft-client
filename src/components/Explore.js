import ExploreTag from './ExploreTag';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const Explore = ({ exploreTags }) => {
    const theme = useTheme();

    return (
        <>
        <div id="exploreSection">
        <Box sx={{fontFamily: 'Arial, sans-serif', bgcolor: theme.palette.primary.main, borderRadius: 5, margin: 5, display: 'flex'}}>
          <Typography sx={{ p: 1, flexGrow: 1}} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Explore</Typography></Box>
        <List sx={{marginTop: 5, marginRight: 5, marginLeft: 5}} style={{flexDirection: 'row'}}>
            {exploreTags.map((tag, index) => (
                <ExploreTag key={ index } tag={ tag.name } posts={ tag.posts }/>
            ))}
        </List>
        </div>
        </>
    )
}

export default Explore;