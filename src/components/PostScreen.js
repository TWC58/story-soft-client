import { useContext, useState } from 'react'
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
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PostScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [currentListNameText, setListNameText] = useState((store.currentList) ? store.currentList.name : "");
    const history = useHistory();

    const theme = useTheme();

    return (
        <div id="post-workspace">
            <div id="post-sections">
                <Box sx={{ width: '100%', height: '100%', bgcolor: theme.palette.primary.main }}>
                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Sections</Typography>
                    </Box>
                    <List sx={{ fontFamily: 'Arial, sans-serif' }}>
                        <ListItem sx={{ cursor: 'pointer' }}>
                            <ArrowRightIcon />
                            Section 1
                        </ListItem>
                    </List>
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
                        />
                        <TextField
                            sx={{ width: '95%', marginBottom: 3 }}
                            label="Section"
                            variant='outlined'
                            id="post-section-textfield"
                            name="section"
                            inputProps={{ style: { fontWeight: 'bold', fontSize: '16pt' } }}
                        />
                        <TextField
                            sx={{ width: '95%', marginBottom: 3 }}
                            multiline
                            rows={15}
                            label="Section Content"
                            variant='outlined'
                            id="post-content-field"
                            name="section-content"
                        />
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
                    </Box>

                    <Box sx={{ borderRadius: '5px', width: '90%', height: '20%', bgcolor: theme.palette.primary.light }}></Box>

                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Draw</Typography>
                    </Box>

                    <Box sx={{ borderRadius: '5px', width: '90%', height: '10%', bgcolor: theme.palette.primary.light }}></Box>

                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Avatar</Typography>
                    </Box>

                    <Box sx={{ borderRadius: '5px', width: '90%', height: '10%', bgcolor: theme.palette.primary.light }}></Box>

                    <Box sx={{ fontFamily: 'Arial, sans-serif', margin: 0, display: 'flex' }}>
                        <Typography sx={{ p: 1, flexGrow: 1 }} style={{ fontSize: '20pt', fontWeight: 'bold', justifyContent: 'center' }} align="center">Description</Typography>
                    </Box>
                    <Box sx={{ borderRadius: '5px', width: '90%', bgcolor: theme.palette.primary.light }}>
                        <TextField
                            sx={{ width: '100%', height: '100%', marginBottom: 0 }}
                            multiline
                            rows={7}
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