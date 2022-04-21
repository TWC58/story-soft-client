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

    useEffect(async () => {
        if (currentPostName === null && store.currentPost) {
            await store.recursiveSectionBuilder(store.currentPost.rootSection);
            setCurrentPostName(store.currentPost.name);
            setCurrentSectionName(store.currentPost.loadedRoot.name);
        } else if (!store.currentPost) {
            // store.goHome();
        }
    })

    const handlePostNameChange = (e) => {
        setCurrentPostName(e.target.value);
    }

    const handleSectionNameChange = (e) => {
        setCurrentSectionName(e.target.value);
    }

    const theme = useTheme();

    return (
        <div id="post-workspace">
            <div id="post-sections">
                <Box sx={{ width: '100%', height: '100%', bgcolor: theme.palette.primary.main }}>
                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Sections</Typography>
                    </Box>
                    {/* <SectionTree rootSection={store.currentPost ? store.currentPost.loadedRoot : {name: "RootSection", children: [], _id: "12324"}}/> */}
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
                            <Button sx={{ width: '100%', marginRight: 4 }} variant="contained"  >Save</Button>
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
                        />
                    </Box>
                </Box>
            </div>
        </div>
    )
}

export default PostScreen;