import { useContext, useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { MediaType } from '../store/index.js'
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { createStore } from 'polotno/model/store';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { SidePanel } from 'polotno/side-panel';
import { Workspace } from 'polotno/canvas/workspace';
import SectionTree from './SectionTree'
import QEditor from './QEditor';
import QEditorReadOnly from './QEditorReadOnly.js';
import AddIcon from '@mui/icons-material/Add';
import { getSection } from '../api';
import List from '@mui/material/List';
import Comment from './Comment';

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PostScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [currentPostName, setCurrentPostName] = useState(null);
    const [currentSectionName, setCurrentSectionName] = useState(null);
    const [currentSectionId, setCurrentSectionId] = useState("12324");
    const [currentSectionData, setCurrentSectionData] = useState("");
    const [currentDescription, setCurrentDescription] = useState(null);
    const [currentCommentInput, setCurrentCommentInput] = useState(null);
    const [readyToSave, setReadyToSave] = useState(false); //when updated, we know we can make API call bc react respects order of state changes
    const [loaded, setLoaded] = useState(false);
    const pStore = createStore();

    let loadAttempted = false;

    useEffect(async () => {
        if (loaded) setLoaded(false);
        if (readyToSave) {
            store.currentPost.name = currentPostName;
            store.currentPost.summary = currentDescription;

            let loadedCurrentSection = store.findLoadedSection(currentSectionId);
            loadedCurrentSection.name = currentSectionName;
            loadedCurrentSection.data = currentSectionData;

            await store.updatePost(store.currentPost);
            await store.updateSection(currentSectionId, {
                name: currentSectionName,
                data: currentSectionData
            });
            setReadyToSave(false);
        }
        if (currentPostName === null && store.currentPost) {
            await store.recursiveSectionBuilder(store.currentPost.rootSection);
            await store.setCommentList(store.currentPost.loadedRoot.comments);
            setCurrentPostName(store.currentPost.name);
            setCurrentSectionName(store.currentPost.loadedRoot.name);
            setCurrentSectionId(store.currentPost.loadedRoot._id);
            setCurrentSectionData(store.currentPost.loadedRoot.data);
            setCurrentDescription(store.currentPost.summary);
        } else if ((!store.currentPost && !loadAttempted) ||window.location.pathname.substring("/post/".length) !=  store.currentPost._id) {
            const postId = window.location.pathname.substring("/post/".length);
            console.log(postId);
            await store.getPost(postId);
            loadAttempted = true;
            if (store.currentPost)
                await store.recursiveSectionBuilder(store.currentPost.rootSection);
            setLoaded(true);
        } else if (loadAttempted) {
            auth.setError("Post not found!");
        }
    }, [readyToSave, loaded, currentSectionId, currentPostName]);

    const handlePostNameChange = (e) => {
        setCurrentPostName(e.target.value);
    }

    const handleSectionNameChange = (e) => {
        console.log(e.target.value);
        setCurrentSectionName(e.target.value);
    }

    const handleSave = async () => {
        setReadyToSave(true); //wait for this to call useEffect and save
    }

    const handleSetCurrentSection = (sectionId) => {
        if (currentSectionId !== sectionId) {
            //if (!(store.currentPost?.published))
            const section = store.findLoadedSection(sectionId);
            setCurrentSectionId(sectionId);
            setCurrentSectionData(section.data);
            setCurrentSectionName(section.name);
            store.setCommentList(section.comments);
        }
    }

    const handleDescriptionChange = (e) => {
        setCurrentDescription(e.target.value);
    }

    const handleAddSection = async () => {
        let newSection = await store.addSection(currentSectionId);
        setCurrentSectionId(newSection._id);
        setCurrentSectionName(newSection.name);
        setCurrentSectionData(newSection.data);
    }

    const handleDeleteSection = async () => {
        console.log("DELETING SECTION: ", currentSectionId);
        store.markSectionForDeletion(currentSectionId);
    }

    const handlePublish = async () => { //update published and
        console.log("PUBLISHING");
        store.currentPost.published = new Date();
        setReadyToSave(true);
    }

    const handleDeletePost = async () => {
        console.log("DELETING POST");
        console.log(store.currentPost._id);
        store.markPostForDeletion(store.currentPost._id);
    }

    const handleSectionDataChange = (data) => {
        setCurrentSectionData(data);
    }

    const handleCommentInputChange = (e) => {
        setCurrentCommentInput(e.target.value);
    }

    const handleCreateComment = async () => {
        if (currentCommentInput){
            let commentContent = {
                "username": auth.user.username,
                "message": currentCommentInput
            }
            store.createComment(currentSectionId, commentContent);
        }
    }

    var getPostTitle = () => {
        if (store.currentPost.published) {
            return (
                <Typography
                    sx={{ width: '95%', marginBottom: 2, fontSize: 36, fontWeight: 'bold' }}
                    id="post-title-textfield"
                    name="title">
                    {currentPostName ? currentPostName : ""}
                </Typography>
            )
        }
        return (
            <TextField
                sx={{ width: '95%', marginBottom: 2 }}
                label="Title"
                variant='outlined'
                id="post-title-textfield"
                name="title"
                inputProps={{ style: { fontWeight: 'bold', fontSize: '24pt' } }}
                value={currentPostName ? currentPostName : ""}
                onChange={handlePostNameChange}
            />
        )
    }

    const getSectionTitle = () => {
        if (store.currentPost.published) {
            return (
                <Typography
                    sx={{ width: '95%', marginBottom: 2, fontSize: 24, fontWeight: 'bold' }}
                    id="post-title-textfield"
                    name="title">
                    {currentSectionName ? currentSectionName : ""}
                </Typography>
            )
        }
        return (
            <TextField
                sx={{ width: '95%', marginBottom: 3 }}
                label="Section"
                variant='outlined'
                id="post-section-textfield"
                name="section"
                inputProps={{ style: { fontWeight: 'bold', fontSize: '16pt' } }}
                value={currentSectionName ? currentSectionName : ""}
                onChange={handleSectionNameChange}
            />
        )
    }

    const getDescription = () => {
        if (store.currentPost.published) {
            return (<>
                <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                    <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Description</Typography>
                </Box>
                <Box sx={{ borderRadius: '5px', width: '90%', bgcolor: theme.palette.primary.light }}>
                    <TextField
                        sx={{ cursor: null, width: '100%', height: '100%', marginBottom: 0, fontSize: 16 }}
                        multiline
                        rows={8}
                        id="post-content-field"
                        name="section-content"
                        type='text'
                        readOnly={true}
                        value={currentDescription ? currentDescription : ""}
                    />
                </Box>
            </>)
        }
        return (<>
            <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Description</Typography>
            </Box>
            <Box sx={{ borderRadius: '5px', width: '90%', bgcolor: theme.palette.primary.light }}>
                <TextField
                    sx={{ width: '100%', height: '100%', marginBottom: 0 }}
                    multiline
                    rows={8}
                    id="post-content-field"
                    name="section-content"
                    value={currentDescription ? currentDescription : ""}
                    onChange={handleDescriptionChange}
                />
            </Box>
        </>)
    }

    const getTools = () => {
        return (<>
            <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Tools</Typography>
            </Box>

            <Box sx={{ borderRadius: '5px', width: '90%', height: '35%', bgcolor: theme.palette.primary.light }}>
                {
                    store.mediaType === MediaType.COMIC ?
                        <SidePanelWrap>
                            <SidePanel store={pStore} />
                        </SidePanelWrap>
                        :
                        ""
                }
            </Box>
        </>)
    }

    const getComments = () => {
        return (<>
            <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Comments</Typography>
            </Box>

            <Box sx={{ borderRadius: '5px', width: '90%', height: '45%', bgcolor: theme.palette.primary.light }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <TextField
                        multiline
                        sx={{ width: '90%', marginBottom: 0, marginTop: 1, marginRight: 0.5, marginLeft: 0.5 }}
                        size='small'
                        maxRows={1}
                        variant='outlined'
                        id="post-comment-textfield"
                        name="comment-textfield"
                        placeholder="Join the discussion (Max Char Limit 120)"
                        inputProps={{ maxLength: 120, style: { fontSize: '10pt' } }}
                        value={currentCommentInput}
                        onChange={handleCommentInputChange}
                    />
                    <Button onClick={handleCreateComment} sx={{ marginBottom: 0, marginTop: 2 }} variant="contained">Post</Button>
                </Box>
                <Box sx={{ height: '100%' }}>
                    <List style={{ maxHeight: '78%', overflow: 'auto' }}>
                        {store.comments !== null ? store.comments.map((comment) => (
                            <Comment comment={comment} sectionId={currentSectionId} />
                        )) 
                        : 
                        ""}

                    </List>
                </Box>
            </Box>
        </>)
    }

    const getLeftPanel = () => {

    }

    const getRightPanel = () => {

    }

    const getSectionContent = () => {

    }

    const theme = useTheme();

    return (
        < div id="post-workspace" width="100%">
            <div id="post-sections">
                <Box sx={{ width: '100%', height: '90%', bgcolor: theme.palette.primary.main }}>
                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Sections</Typography>
                        {store.currentPost ? store.currentPost.published ?
                            null
                            :
                            <IconButton onClick={handleAddSection} sx={{}} aria-label="delete" size="small">
                                <AddIcon fontSize="small" />
                            </IconButton>
                            :
                            null
                        }
                    </Box>
                    <SectionTree rootSection={store.currentPost ? store.currentPost.loadedRoot : { name: "RootSection", children: [], _id: "12324" }} currentSection={currentSectionId} handleSetCurrentSection={handleSetCurrentSection} />
                </Box>

            </div>

            <div id="post-edit">

                <Box sx={{ width: '100%', height: '85%', marginTop: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <>{store.currentPost ?
                        getPostTitle()
                        :
                        null
                    }</>
                    <>{store.currentPost ?
                        getSectionTitle()
                        :
                        null
                    }</>
                    {
                        (!store.currentPost?.published) ?
                            (store.mediaType === MediaType.STORY ?
                                <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', overflowY: 'scroll', marginTop: 1, marginBottom: 1, height: '80%', width: '90%', align: 'center' }}>
                                    <QEditor handleSectionDataChange={handleSectionDataChange} currentSectionData={currentSectionData} />
                                </Box> :
                                // <ComicWorkspace />
                                <WorkspaceWrap>
                                    {/* <Toolbar store={pStore} downloadButtonEnabled /> */}
                                    <Toolbar store={pStore} />
                                    <Workspace store={pStore} components={{ PageControls: () => null }} style={{}} />
                                    <ZoomButtons store={pStore} />
                                </WorkspaceWrap>)
                            :
                            <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', overflowY: 'scroll', marginTop: 1, marginBottom: 1, height: '80%', width: '90%', align: 'center' }}>
                                <QEditorReadOnly currentSectionData={currentSectionData} />
                            </Box>

                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1, marginBottom: 1 }}>
                        {store.currentPost ? store.currentPost.published ? null : <Button variant="contained" onClick={handleSave} >Save</Button> : null}
                        {store.currentPost ? store.currentPost.published ? null : <Button variant="contained" onClick={handlePublish}>Publish</Button> : null}
                    </Box>
                    {store.currentPost ? store.currentPost.published ? auth.user ? store.currentPost.userData.userId === auth.user._id ?
                        <Button sx={{ bgcolor: 'red' }} onClick={handleDeletePost} variant="contained" className="workspace-button"  >Delete Post</Button>
                        :
                        null
                        :
                        null
                        : <>
                            <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 1 }}>
                                <Button onClick={handleDeletePost} type="button" variant="contained" className="workspace-button"  >Delete Post</Button>
                                <Button onClick={handleDeleteSection} type="button" variant="contained" className="workspace-button"  >Delete Section</Button>
                            </Box>
                        </> :
                        null
                    }
                </Box>

            </div>
            <div id="post-tools">
                <Box sx={{ width: '100%', height: '90%', bgcolor: theme.palette.primary.main, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    {store.currentPost ? store.currentPost.published ?
                        getComments()
                        :
                        store.mediaType == "COMIC" ?
                            getTools()
                            :
                            null
                        :
                        null
                    }

                    {/* <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Draw</Typography>
                    </Box>

                    <Box sx={{ borderRadius: '5px', width: '90%', height: '10%', bgcolor: theme.palette.primary.light }}></Box>

                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Avatar</Typography>
                    </Box>

                    <Box sx={{ borderRadius: '5px', width: '90%', height: '10%', bgcolor: theme.palette.primary.light }}></Box> */}
                    <>{store.currentPost ?
                        getDescription()
                        :
                        null
                    }</>
                </Box>
            </div>

        </div >
    )
}

export default PostScreen;