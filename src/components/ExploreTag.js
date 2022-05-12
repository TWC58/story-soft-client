import { ExploreCard } from './ExploreCard';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@mui/material/styles';
import { ListSubheader } from '@mui/material';
import { bgcolor } from '@mui/system';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const ExploreTag = ({ tag, posts }) => {
  const theme = useTheme();

  const formatTag = (s) => {
    s = s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
 
    return (
      <>
        <Box sx={{fontFamily: 'Arial, sans-serif', bgcolor: theme.palette.primary.main, borderRadius: 5, justifyContent: 'center', alignItems: 'center', boxShadow: 3 }}>
          <Typography sx={{ p: 1, flexGrow: 1}} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">{formatTag(tag)}</Typography>
        </Box>
          {(posts) ? 
          posts.map((post, index) => (
            <ExploreCard key={index} post={post}/>
          ))
        :
        ""}
      </>
    )
};

export default ExploreTag;