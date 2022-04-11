import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { ListItem } from '@mui/material';

export const ExploreCard = ({ post }) => {
    const theme = useTheme();
    return (
        <>
        <ListItem sx={{ bgcolor: theme.palette.primary, borderRadius: 0, display: 'flex', width: '100%', position: 'relative'}}>
            <Box sx={{fontFamily: 'Arial, sans-serif', backgroundColor: theme.palette.primary.light, borderRadius: 5, width: '100%', display: 'inline', p: 1}} style={{cursor: 'pointer'}}>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{post.title}</Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{post.author}</Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{post.published}</Box>
                <Box sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{post.description}</Box>
                <Box sx={{ height: '95%' }}>
                    <div id="like-area">
                        <span>
                            <IconButton>
                                <ThumbUpOffAltIcon sx={{ pt: 2 }}/>
                            </IconButton>
                        </span>
                        <span className="like-display">
                            {post.likes}
                        </span>
                        <span>
                            <IconButton>
                                <ThumbDownOffAltIcon sx={{ pt: 2 }} />
                            </IconButton>
                        </span>
                        <span className="like-display">
                            {post.dislikes}
                        </span>
                    </div>
                </Box>
            </Box>
        </ListItem>
        </>
    );
};