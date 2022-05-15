import { useContext, useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material'
import { GlobalStoreContext, LikeType } from '../store/index.js'
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
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { DownloadButton } from 'polotno/toolbar/download-button';
import { PostOptions } from './PostOptions';
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
    const [currentTag, setCurrentTag] = useState("");
    const [userPostsLoaded, setUserPostsLoaded] = useState(false);
    const [readyToSave, setReadyToSave] = useState(false); //when updated, we know we can make API call bc react respects order of state changes
    const [loaded, setLoaded] = useState(false);
    const[pStore, setPStore] = useState(createStore());
    console.log("pStore created");
    let comicSectionData = {};

    const [childSections, setChildSections] = useState(null); //store child sections

    let loadAttempted = false;
    let isComicLoaded = false;

    useEffect(async () => {
        console.log("CURRENT SECTION DATA: " + JSON.stringify(currentSectionData));
        if (loaded) setLoaded(false);
        
        if (auth.user && !userPostsLoaded){
            store.getUserPosts(auth.user._id, 'ID');
            setUserPostsLoaded(true);
        }

        if (readyToSave) {
            store.currentPost.name = currentPostName;
            store.currentPost.summary = currentDescription;
            store.currentPost.tags[0] = currentTag;

            let loadedCurrentSection = store.findLoadedSection(currentSectionId);
            loadedCurrentSection.name = currentSectionName;
            loadedCurrentSection.data = currentSectionData;

            if (store.currentPost.published && auth.mediaType === MediaType.COMIC) {
                await publishComic();
            }

            await store.updatePost(store.currentPost);
            if (auth.mediaType !== MediaType.COMIC || !store.currentPost?.published)
                await store.updateSection(currentSectionId, {
                    name: currentSectionName,
                    data: currentSectionData
                });
            

            if (auth.mediaType === MediaType.COMIC && store.currentPost?.published)
                window.location.reload(true);
            else
                setReadyToSave(false);
                
            // if (auth.mediaType === MediaType.COMIC && store.currentPost?.published)
            //     handleSetCurrentSection(currentSectionId);
        }
        if (currentPostName === null && store.currentPost) {
            isComicLoaded = false;
            await store.recursiveSectionBuilder(store.currentPost.rootSection);
            await store.setCommentList(store.currentPost.loadedRoot.comments);
            setCurrentPostName(store.currentPost.name);
            setCurrentSectionName(store.currentPost.loadedRoot.name);
            setCurrentSectionId(store.currentPost.loadedRoot._id);
            setCurrentSectionData(store.currentPost.loadedRoot.data);
            setCurrentDescription(store.currentPost.summary);
            setCurrentTag(store.currentPost.tags.length > 0 ? store.currentPost.tags[0] : "");
            setChildSections(getCurrentChildren(store.currentPost.loadedRoot._id));

            if (!store.currentPost?.published && auth.mediaType === MediaType.COMIC && store.currentPost.loadedRoot.data) {
                console.log("LOADING ROOT COMIC DATA: " + JSON.stringify(store.currentPost.loadedRoot.data));
                pStore.loadJSON(store.currentPost.loadedRoot.data);
                await pStore.waitLoading();
            }
                
        } else if ((!store.currentPost && !loadAttempted) || window.location.pathname.substring("/post/".length) != store.currentPost._id) {
            const postId = window.location.pathname.substring("/post/".length);
            console.log("Attempting to load post with ID: " + postId);
            await store.getPost(postId);
            loadAttempted = true;
            if (store.currentPost)
                await store.recursiveSectionBuilder(store.currentPost.rootSection);
            setLoaded(true);
        } else if (loadAttempted) {
            auth.setError("Post not found!");
        }

        if (!store.currentPost?.published && auth.mediaType === MediaType.COMIC && currentSectionData != "" && JSON.stringify(currentSectionData) != JSON.stringify(pStore.toJSON())) {
            console.log("Use effect comic load: " + currentSectionData);
            if (currentSectionData != "" && currentSectionData) {
                pStore.loadJSON(currentSectionData);
                await pStore.waitLoading();
                isComicLoaded = true;
            }
            
        }
    }, [readyToSave, loaded, currentSectionId, currentPostName]);

    //comic saving
    pStore?.on('change', () => {
        if (!readyToSave || JSON.stringify(pStore.toJSON()) != JSON.stringify({"width":1080,"height":1080,"fonts":[],"pages":[]}) && JSON.stringify(pStore.toJSON()) != JSON.stringify(currentSectionData)) {
            console.log("onChange save comic, new value: " + JSON.stringify(pStore.toJSON()) + " old value: " + JSON.stringify(currentSectionData));
            // comicSectionData = pStore.toJSON();
            setCurrentSectionData(pStore.toJSON());
        }
    });

    const getCurrentChildren = (id) => {
        var childSections = [];
        console.log("CURRENT SECTION ID: ", id);
        const current = store.findLoadedSection(id);
        console.log("GETCURRENTCHILDREN ON: ", current);
        if(!current) return childSections;
        current.children.forEach(childID => {
            
            childSections.push(store.findLoadedSection(childID));
        });
        console.log("CHILD SECTIONS: ", childSections);
        return childSections;
    }

    const publishComic = async () => {
        await store.forEachSection(async (section) => {
            console.log("Handling publish for section: " + section._id);
            if (section._id === currentSectionId) {
                pStore.loadJSON(currentSectionData);
            } else if (section.data !== "") {
                pStore.loadJSON(section.data);    
            } else {
                return;
            }
            // pStore.loadJSON((section._id === currentSectionId) ? currentSectionData : ((section.data === "") ? {"width":1080,"height":1080,"fonts":[],"pages":[]} : section.data));
            await pStore.waitLoading();

            let comicBase64 = await pStore.toDataURL();

            await store.updateSection(section._id, {
                name: (section._id === currentSectionId) ? currentSectionName : section.name,
                data: comicBase64
            });
        })

        await store.recursiveSectionBuilder(store.currentPost.rootSection);
    }

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
            isComicLoaded = false;
            //if (!(store.currentPost?.published))
            const section = store.findLoadedSection(sectionId);
            setCurrentSectionData((auth.mediaType === MediaType.COMIC && section.data === "") ? {"width":1080,"height":1080,"fonts":[],"pages":[]} : section.data);
            setCurrentSectionId(sectionId);
            setCurrentSectionName(section.name);
            setChildSections(getCurrentChildren(sectionId));
            store.setCommentList(section.comments);
        }
    }

    const handleDescriptionChange = (e) => {
        setCurrentDescription(e.target.value);
    }

    const handleTagChange = (e) => {
        setCurrentTag(e.target.value.toLowerCase());
    }

    const handleAddSection = async () => {
        let newSection = await store.addSection(currentSectionId);
        setCurrentSectionData((auth.mediaType === MediaType.COMIC) ? {"width":1080,"height":1080,"fonts":[],"pages":[]} : newSection.data);
        setCurrentSectionId(newSection._id);
        setCurrentSectionName(newSection.name);
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
        if (auth.user) {
            if (currentCommentInput) {
                let commentContent = {
                    "username": auth.user.username,
                    "message": currentCommentInput
                }
                store.createComment(currentSectionId, commentContent);
                // setCurrentCommentInput(null);
            }
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

    const getPostAuthor = () => {
        if (store.currentPost.published) {
            return (
                <Typography
                    sx={{ width: '95%', marginBottom: 2, fontSize: 16, fontWeight: 'bold' }}
                    id="post-author-textfield"
                    name="title"
                    onClick={handleGoToUser}>
                    {store.currentPost.userData ? store.currentPost.userData.username : ""}
                </Typography>
            )
        }
        return "";
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

    const getTagTextField = () => {
        return (!store.currentPost?.published) ?
            <div>
                <Box sx={{ fontFamily: 'Arial, sans-serif', marginTop: '50px', display: 'flex' }}>
                    <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Tag</Typography>
                </Box>
                <Box sx={{ borderRadius: '5px', width: '100%', bgcolor: theme.palette.primary.light }}>
                    <TextField
                        sx={{ width: '100%', height: '100%', marginBottom: 0 }}
                        id="post-tag-field"
                        name="post-tag"
                        value={currentTag ? currentTag : ""}
                        onChange={handleTagChange}
                    />
                </Box>
            </div>
        :
        "";
    }

    const getTools = () => {
        return (<>
            <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Tools</Typography>
            </Box>

            <Box sx={{ borderRadius: '5px', width: '90%', height: '35%', bgcolor: theme.palette.primary.light }}>
                {
                    (auth.mediaType === MediaType.COMIC) && pStore ?
                        <SidePanelWrap >
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
                        placeholder={auth.user ? "Join the discussion (Max Char Limit 120)" : "Must be logged in to comment!"}
                        inputProps={{ maxLength: 120, style: { fontSize: '10pt' } }}
                        value={currentCommentInput}
                        onChange={handleCommentInputChange}
                        disabled={!auth.user}
                    />
                    <Button onClick={handleCreateComment} sx={{ marginBottom: 0, marginTop: 2 }} variant="contained" disabled={!auth.user}>Post</Button>
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

    const handleGoToUser = (e) => {
        store.pushToHistory(`/profile/${store.currentPost.userData.userId}`);
    }

    const getLikeArea = () => {
        if (store.currentPost.published) {
            return (
                <div id="like-area">
                    <span>
                        <IconButton onClick={handleThumbUp} disabled={!auth.user || !auth.loggedIn || !store.currentPost.published}>
                            <ThumbUpOffAltIcon sx={{ fontSize: '24pt' }} color={(auth.user && auth.userHasLike(store.currentPost._id)) ? "secondary" : "default"} />
                        </IconButton>
                    </span>
                    <span className="like-display">
                        {store.currentPost.likes}
                    </span>
                    <span>
                        <IconButton onClick={handleThumbDown} disabled={!auth.user || !auth.loggedIn || !store.currentPost.published}>
                            <ThumbDownOffAltIcon sx={{ fontSize: '24pt' }} color={(auth.user && auth.userHasDislike(store.currentPost._id)) ? "secondary" : "default"} />
                        </IconButton>
                    </span>
                    <span className="like-display">
                        {store.currentPost.dislikes}
                    </span>
                </div>
            );
        }
        return "";
    }

    async function handleThumbUp() {
        const postId = store.currentPost._id;
        const success = await store.likePost(postId, LikeType.LIKE);
        if (success) {
            if (auth.userHasLike(postId)) {
                store.currentPost.likes--;
            } else {
                store.currentPost.likes++;
            }

            if (auth.userHasDislike(postId)) {
                store.currentPost.dislikes--;
            }

            auth.getLoggedIn();
        }
    }

    async function handleThumbDown() {
        const postId = store.currentPost._id;
        const success = await store.likePost(postId, LikeType.DISLIKE);
        if (success) {
            if (auth.userHasDislike(postId)) {
                store.currentPost.dislikes--;
            } else {
                store.currentPost.dislikes++;
            }

            if (auth.userHasLike(postId)) {
                store.currentPost.likes--;
            }

            auth.getLoggedIn();
        }
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
                    <>{store.currentPost ?
                        getPostAuthor()
                        :
                        null
                    }</>
                    <>{store.currentPost ?
                        getLikeArea()
                        :
                        null
                    }</>
                    {
                        (!store.currentPost?.published || readyToSave && auth.mediaType === MediaType.COMIC) ?
                            (auth.mediaType === MediaType.STORY ?
                                <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', overflowY: 'scroll', marginTop: 1, marginBottom: 1, height: '80%', width: '90%', align: 'center' }}>
                                    <QEditor handleSectionDataChange={handleSectionDataChange} currentSectionData={currentSectionData} />
                                </Box> :
                                (pStore) ?
                                // <ComicWorkspace />
                                    <PolotnoContainer style={{ height: '100vh', width: '1000px', minHeight: '500px' }}>
                                        <WorkspaceWrap>
                                            <Toolbar
                                            store={pStore}
                                            components={{
                                                ActionControls: ({ store }) => {
                                                return (
                                                    <div>
                                                    <DownloadButton store={store} />
                                                    <Button
                                                        intent="primary"
                                                        onClick={() => {
                                                        alert('Saving');
                                                        }}
                                                    >
                                                        Save
                                                    </Button>
                                                    </div>
                                                );
                                                },
                                            }}
                                            />
                                            <Workspace 
                                                store={pStore} 
                                                components={{ PageControls: () => null }} 
                                                style={{}} 
                                                backgroundColor="white"
                                                pageBorderColor="black" // border around page
                                                activePageBorderColor="orange"
                                            />
                                            <ZoomButtons store={pStore} />
                                        </WorkspaceWrap>
                                    </PolotnoContainer>
                                :
                                "")
                                
                            : (auth.mediaType === MediaType.STORY) ?
                            <Box sx={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', overflowY: 'scroll', marginTop: 1, marginBottom: 1, height: '80%', width: '90%', align: 'center' }}>
                                <QEditorReadOnly currentSectionData={currentSectionData} />
                            </Box>
                                :
                                <img style={{ height: '100vh', width: 'auto', minHeight: '500px' }} src={currentSectionData}/>

                    }
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 1, marginBottom: 1 }}>
                        {store.currentPost ? store.currentPost.published ? null : <Button variant="contained" onClick={handleSave} >Save</Button> : null}
                        {store.currentPost ? store.currentPost.published ? null : <Button variant="contained" onClick={handlePublish}>Publish</Button> : null}
                    </Box>
                    { childSections ? <PostOptions sections={childSections} handleSetCurrentSection={handleSetCurrentSection}/> : null }
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
                        auth.mediaType == "COMIC" ?
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
                    {
                        getTagTextField()
                    }
                </Box>
            </div>

        </div >
    )
}

export default PostScreen;