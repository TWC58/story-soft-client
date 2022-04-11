import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Comment from './Comment.js';
import { ListItem } from '@mui/material';
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import AuthContext from '../auth'

export default function ListCommentArea(props) {

    const { list } = props;
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [comments, setComments] = useState(list.comments);

    async function handleKeyPress(event) {
        if (event.code === "Enter") {
            if (event.target.value !== "") {
                let newComment = await store.postComment(event.target.value, list._id);
                setComments([...comments, newComment]);
                event.target.value = "";
            }
        }
    }

    // alert(list.comments);

    if (comments) {
        comments.sort((first, second) => {
            return second.created - first.created;
        });
    }

    let commentsViewArea = (comments) ? 
        comments.map((comment) => {
            return <ListItem
            key={comment._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{
                fontSize: '48pt',
                width: '100%'
            }}>
                <Comment comment={comment}/>
            </ListItem>
        }) :
        "";

    return (
        <Box id="list-comment-area-container">
            <div id="comment-list">
                <Box sx={{ width: '100%', left: "5%", bgcolor: 'background.clear' }}>
                    <List>
                        {
                            commentsViewArea
                        }
                    </List>
                </Box>
            </div>
            <div id="submit-comment-container">
                <TextField  
                    id="comment-text-field"
                    disabled={!auth.user || !auth.loggedIn || !(list.published || list.updated)}
                    fullWidth
                    placeholder={(!auth.user || !auth.loggedIn || !(list.published || list.updated)) ? "Commenting is disabled" : "Add comment"}
                    onKeyPress={handleKeyPress}
                />
            </div>
        </Box>
    )
}