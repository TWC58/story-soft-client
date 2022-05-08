import { ListItem, Button } from '@mui/material';
import { useContext, useState } from 'react'
import { useTheme } from '@mui/material/styles';
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function Comment(props) {

    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [currentReplyInput, setCurrentReplyInput] = useState(null);

    const { comment } = props;

    const handleReplyInputChange = (e) => {
        setCurrentReplyInput(e.target.value);
        console.log(currentReplyInput);
    }
    const handleReplyToComment = async () => {
        let replyContent = {
            "username": auth.user.username,
            "message": currentReplyInput
        }
        store.replyComment(comment._id, replyContent);
    }
    return (
        <ListItem>
            <Box sx={{ fontFamily: 'Arial, sans-serif', width: '100%' }}>
                <Typography style={{ fontSize: 15, fontWeight: 'bold' }}>{comment.username}</Typography>
                <Typography style={{ fontSize: 12, color: '#3d3d3d' }}>{comment.createdAt}</Typography>
                <Typography style={{ fontSize: 13, marginBottom: 2 }}>{comment.message}</Typography>
                {store.currentPost.userData.userId === auth.user._id && comment.reply.message === null
                    ?
                    <TextField
                        multiline
                        sx={{ width: '100%', marginBottom: 0, marginTop: 1, }}
                        size='small'
                        maxRows={2}
                        variant='outlined'
                        id={"post-reply-textfield" + comment._id}
                        name="reply-textfield"
                        inputProps={{ maxLength: 120, style: { fontSize: '10pt' } }}
                        value={currentReplyInput}
                        onChange={handleReplyInputChange}

                    />
                    :
                    comment.reply.message === null
                        ?
                        null
                        :
                        <Box sx={{ paddingLeft: 2 }}>
                            <Typography style={{ fontSize: 13, fontWeight: 'bold' }}>{comment.reply.username} (Author)</Typography>
                            <Typography style={{ fontSize: 12.5 }}>{comment.reply.message}</Typography>
                        </Box>}
            </Box>
            {store.currentPost.userData.userId === auth.user._id && comment.reply.message == null
                ? <Button onClick={handleReplyToComment}>Reply</Button>
                : null}
        </ListItem>
    )
}