import { useContext, useState, useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Top5ItemEdit from './Top5ItemEdit.js'
import List from '@mui/material/List';
import { IconButton, Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ListItem } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { MediaType } from '../store/index.js'
import ComicWorkspace from './ComicWorkspace'
import SectionTree from './SectionTree'
import AddIcon from '@mui/icons-material/Add';

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
    const [currentDescription, setCurrentDescription] = useState(null);
    const [readyToSave, setReadyToSave] = useState(false); //when updated, we know we can make API call bc react respects order of state changes
    // const [loadAttempted, setLoadAttempted] = useState(false);

    let loadAttempted = false;

    useEffect(async () => {
        if(readyToSave){
            store.currentPost.name = currentPostName;
            store.currentPost.summary = currentDescription;
            await store.updatePost(store.currentPost);
            setReadyToSave(false);
        }
        if (currentPostName === null && store.currentPost) {
            await store.recursiveSectionBuilder(store.currentPost.rootSection);
            setCurrentPostName(store.currentPost.name);
            setCurrentSectionName(store.currentPost.loadedRoot.name);
            setCurrentSectionId(store.currentPost.loadedRoot._id);
            setCurrentDescription(store.currentPost.summary);
        } else if (!store.currentPost && !loadAttempted) {
            const postId = window.location.pathname.substring("/post/".length);
            await store.getPost(postId);
            loadAttempted = true;
            if (store.currentPost)
                await store.recursiveSectionBuilder(store.currentPost.rootSection);
        } else if (loadAttempted) {
            auth.setError("Post not found!");
        }
    }, [readyToSave]);

    const handlePostNameChange = (e) => {
        setCurrentPostName(e.target.value);
    }

    const handleSectionNameChange = (e) => {
        setCurrentSectionName(e.target.value);
    }

    const handleSave = async () => {
        setReadyToSave(true); //wait for this to call useEffect and save
    }

    const handleSetCurrentSection = (sectionId) => {
        if (currentSectionId !== sectionId)
            setCurrentSectionId(sectionId);
    }

    const handleDescriptionChange = (e) => {
        setCurrentDescription(e.target.value);
    }

    const handleAddSection = async () => {
        let newSection = await store.addSection(currentSectionId);
        setCurrentSectionId(newSection._id);
        setCurrentSectionName(newSection.name);
    }

    const theme = useTheme();

    return (
        <div id="post-workspace">
            <div id="post-sections">
                <Box sx={{ width: '100%', height: '100%', bgcolor: theme.palette.primary.main }}>
                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Sections</Typography>
                        <IconButton onClick={handleAddSection} sx={{}} aria-label="delete" size="small">
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <SectionTree rootSection={store.currentPost ? store.currentPost.loadedRoot : {name: "RootSection", children: [], _id: "12324"}} currentSection={currentSectionId} handleSetCurrentSection={handleSetCurrentSection}/>
                </Box>

            </div>
            <div id="post-edit">
                <Box sx={{ width: '100%', height: '97%' }}>
                    <Box sx={{ width: '100%', height: '85%', marginTop: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
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
                        {
                        store.mediaType === MediaType.STORY ?
                            <TextField
                                sx={{ width: '95%', marginBottom: 3 }}
                                multiline
                                rows={15}
                                label="Section Content"
                                variant='outlined'
                                id="post-content-field"
                                name="section-content"
                            /> : 
                            <ComicWorkspace />
                        }
                        <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: 2 }}>
                            <Button sx={{ width: '100%', marginRight: 4 }} variant="contained" onClick={handleSave} >Save</Button>
                            <Button sx={{ width: '100%' }} variant="contained" >Publish</Button>
                        </Box>
                        <Button color="error" variant="contained" className="workspace-button"  >Delete Section</Button>

                    </Box>

                </Box>
            </div>
            <div id="post-tools">
                <Box sx={{ width: '100%', height: '100%', bgcolor: theme.palette.primary.main, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Tools</Typography>
                        {
                            store.mediaType === MediaType.COMIC ? 
                            ""
                            :
                            ""
                        }
                    </Box>

                    <Box sx={{ borderRadius: '5px', width: '90%', height: '35%', bgcolor: theme.palette.primary.light }}></Box>

                    {/* <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Draw</Typography>
                    </Box>

                    <Box sx={{ borderRadius: '5px', width: '90%', height: '10%', bgcolor: theme.palette.primary.light }}></Box>

                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Avatar</Typography>
                    </Box>

                    <Box sx={{ borderRadius: '5px', width: '90%', height: '10%', bgcolor: theme.palette.primary.light }}></Box> */}

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
                </Box>
            </div>
        </div>
    )
}

export default PostScreen;