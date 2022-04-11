import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemsSummary from './ListItemsSummary.js';
import ListCommentArea from './ListCommentArea.js';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button';
import { ListViewMode } from '../store/index.js';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AuthContext from '../auth'


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function StoryCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [expanded, setExpanded] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(1);
    let { startList } = props;
    const [list, setList] = useState({});
    const history = useHistory();

    useEffect(() => {
        if (startList) {
            setList(startList);
        }
      }, [startList])
    
    
    // function handleLoadList(event, id) {
    //     if (!event.target.disabled) {
    //         // CHANGE THE CURRENT LIST
    //         store.setCurrentList(id);
    //     }
    // }

    // async function handleThumbUp() {
    //     if (!auth.userHasLike(list._id)) {
    //         let updatedList = await store.likeList(list, true);
    //         // list = updatedList;
    //         setList(updatedList);
    //     } else {
    //         let updatedList = await store.unlikeList(list, true);
    //         // list = updatedList;
    //         // alert(updatedList.name);
    //         setList(updatedList);
    //     }
    // }

    // async function handleThumbDown() {
    //     if (!auth.userHasDislike(list._id)) {
    //         let updatedList = await store.likeList(list, false);
    //         // list = updatedList;
    //         setList(updatedList);
    //     } else {
    //         let updatedList = await store.unlikeList(list, false);
    //         // list = updatedList;
    //         setList(updatedList);
    //     }
    // }

    // function handleDeleteList(event, id) {
    //     event.stopPropagation();
    //     store.markListForDeletion(id);
    // }

    // async function handleExpand() {
    //     if (store.listViewMode === ListViewMode.COMMUNITY_LISTS) {
    //         let updatedList = await store.viewCommunityList(list);
    //         if (!updatedList)
    //             return;
    //         setList(updatedList);
    //     } else if (store.listViewMode !== ListViewMode.MY_LISTS) {
    //         let updatedList = await store.viewList(list);
    //         if (!updatedList)
    //             return;
    //         setList(updatedList);
    //     }
        
    //     // setForceUpdate(!forceUpdate);
    //     setExpanded(true);
    // }

    // function handleLess() {
    //     setExpanded(false);
    // }

    // let pclass = "list-card " + ((list.published || list.updated) ? "published-list-card" : "unpublished-list-card");

    // let published = "";

    // if (list.published) {
    //     published = "Published " + (new Date(list.published)).toDateString().substring(4);
    // } else if (store.listViewMode === ListViewMode.MY_LISTS) {
    //     published = <Button id="list-card-edit-button" size="small" onClick={(event) => {
    //         handleLoadList(event, list._id)
    //     }}>Edit</Button>;
    // } else if (store.listViewMode === ListViewMode.COMMUNITY_LISTS) {
    //     published = "Updated " + (new Date(list.updatedAt)).toDateString().substring(4);
    // }

    // let trash = (store.listViewMode === ListViewMode.MY_LISTS) ? 
    //     <IconButton onClick={(event) => {
    //         handleDeleteList(event, list._id)
    //     }} aria-label='delete'>
    //         <DeleteIcon style={{fontSize:'24pt'}} />
    //     </IconButton> :
    //     <Box sx={{ p: 1 }}>
    //     </Box>;

    // let expand = (!expanded) ? 
    //     <IconButton onClick={handleExpand} aria-label='expand'>
    //         <ExpandMoreIcon style={{fontSize:'24pt'}} />
    //     </IconButton> :
    //     <IconButton onClick={handleLess} aria-label='less'>
    //         <ExpandLessIcon style={{fontSize:'24pt'}} />
    //     </IconButton>;

    // let listSummary = (expanded) ? 
    //     <ListItemsSummary list={list}/> :
    //     "";

    // let commentArea = (expanded) ?
    //     <ListCommentArea list={list} /> :
    //     "";

    // let creator = (store.listViewMode === ListViewMode.COMMUNITY_LISTS) ?
    //     "" :
    //     "By: " + list.username;

    // let likeButtonColor = (auth.user && auth.userHasLike(list._id)) ? "secondary" : "default";

    let cardElement =
        <ListItem
            id={list._id}
            key={list._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{
                fontSize: '48pt',
                width: '100%'
            }}
            // className={pclass}
        >
                {/* <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1 }}>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{fontSize:'24pt'}}>{list.name}</Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{fontSize:'12pt'}}>{creator}</Box>
                    <Box>{listSummary}</Box>
                    <Box sx={{ p: 1, flexGrow: 1 }} style={{fontSize:'12pt'}}>{published}</Box>
                </Box>
                <Box sx={{ height: '100%' }}>
                    <div id="like-area">
                        <span className="view-display" style={{marginRight: 20}}>
                                { (!(list.published || list.updated)) ? "" : "Views " + list.views}
                        </span>
                        <span>
                            <IconButton disabled={!auth.user || !auth.loggedIn || !(list.published || list.updated)} color={(auth.user && auth.userHasLike(list._id)) ? "secondary" : "default"} onClick={handleThumbUp} aria-label='expand'>
                                <ThumbUpOffAltIcon style={{fontSize:'36pt'}} />
                            </IconButton>
                        </span>
                        <span className="like-display">
                            {list.likes}
                        </span>
                        <span>
                            <IconButton disabled={!auth.user || !auth.loggedIn || !(list.published || list.updated)} color={(auth.user && auth.userHasDislike(list._id)) ? "error" : "default"} onClick={handleThumbDown} aria-label='expand'>
                                <ThumbDownOffAltIcon style={{fontSize:'36pt'}} />
                            </IconButton>
                        </span>
                        <span className="like-display">
                            {list.dislikes}
                        </span>
                    </div>
                    <Box>
                        {commentArea}
                    </Box>
                </Box>
                <Box sx={{ p: 1 }}>
                    <Box>
                        {trash}
                    </Box>
                    <Box>
                        {expand}
                    </Box>
                </Box> */}
        </ListItem>
    return (
        cardElement
    );
}

export default StoryCard;