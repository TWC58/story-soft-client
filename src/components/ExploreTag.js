import { ExploreCard } from './ExploreCard';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@mui/material/styles';
import { ListSubheader } from '@mui/material';
import { bgcolor } from '@mui/system';
import Box from '@mui/material/Box';

const ExploreTag = ({ tag, posts }) => {
  const theme = useTheme();
 
    return (
      <>
        <Box sx={{fontFamily: 'Arial, sans-serif', bgcolor: theme.palette.primary.main, borderRadius: 5}}>
          <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold' }}>{tag}</Box>
        </Box>
          {posts.map((post, index) => (
            <ExploreCard key={index} post={post}/>
          ))}
      </>
    )
};

export default ExploreTag;