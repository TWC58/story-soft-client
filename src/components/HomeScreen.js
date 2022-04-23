import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext, ListViewMode } from '../store'
import ListCard from './ListCard.js'
import { Fab, ListItem, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import { CenterFocusStrong } from '@mui/icons-material';
import Box from '@mui/material/Box';
import StoryCard from './StoryCard.js'
import ListItemText from '@mui/material/ListItemText';
import { IconButton } from '@mui/material';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Copyright from './Copyright.js'
import useStyles from '../styling/styles'
import Explore from './Explore';
import Following from './Following';

/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const classes = useStyles();

    useEffect(() => {
        // store.loadIdNamePairs();
    }, []);

    // function handleCreateNewList() {
    //     store.createNewList();
    // }

    // if (store.listViewMode === ListViewMode.USER_LISTS && store.lists.length === 0) {
    //     return <Box justifySelf="center" style={{ justifyContent: 'center', height: '100%', width: '100%' }}><div>THERE ARE NO PUBLISHED LISTS FOR THE CURRENT USER SEARCHED</div></Box>
    // }

    let storyExploreCardList1 = "";
    // if (store) {
    storyExploreCardList1 =
        <List sx={{ width: '100%' }} style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            {/* {
                store.lists.map((list) => (
                    <StoryCard
                        key={list._id}
                        startList={list}
                        selected={false}
                    />
                ))
            } */}

            <ListItem className = { classes.exploreListCard }>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"The Nightmare on Circle Road"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"KreddyFrueger"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{"10/2/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"There's an uber in the bus loop... And that's not the worst of it..."}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"1000"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"5000"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem className = { classes.exploreListCard }>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"The Dulling"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"StephanieQueen"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{"2/2/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"A young man will soon find out that the soap in his hotel room is more alive than he thinks..."}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"7000"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"50"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem className = { classes.exploreListCard }>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"Library Starbucks"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"SBUCoffeeColonel"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{"3/23/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"If Taylor doesn't get their coffee soon, the line isn't the only thing getting out..."}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"120"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"0"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>
        </List>;
    // }
    let storyExploreCardList2 = "";
    // if (store) {
    storyExploreCardList2 =
        <List sx={{ width: '100%' }} style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            {/* {
                store.lists.map((list) => (
                    <StoryCard
                        key={list._id}
                        startList={list}
                        selected={false}
                    />
                ))
            } */}

            <ListItem className = { classes.exploreListCard }>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"The Last Cookie"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"FerlockSholmes"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{"2/16/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"Somebody will have to pay the price for the empty jar, but who?"}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"21"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"967"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem className = { classes.exploreListCard }>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"Sesame Sleuth"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"OscarThaGrouch"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{"2/16/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"Rocko was found dead in his Calabasas apartment and Big Bird is going to get to the bottom of it."}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"700"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"500"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem className = { classes.exploreListCard }>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"Where's Wendy?"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"DonaldMcRonald"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{"3/23/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"Ever since the fries were sea salted, nobody's seen Wendy. Everyone's a suspect, even Dave himself..."}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"120"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"10"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>
        </List>;

    let storyExploreCardList3 = "";
    // if (store) {
    storyExploreCardList3 =
        <List sx={{ width: '100%' }} style={{ display: 'flex', flexDirection: 'row', padding: 0 }}>
            {/* {
            store.lists.map((list) => (
                <StoryCard
                    key={list._id}
                    startList={list}
                    selected={false}
                />
            ))
        } */}

            <ListItem
                sx={{ marginRight: '10px', bgcolor: '#A5A6F6', borderRadius: 2.5, display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}
            >
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"The Last Cookie"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"FerlockSholmes"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{"2/16/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"Somebody will have to pay the price for the empty jar, but who?"}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"21"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"967"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem
                sx={{ marginRight: '10px', bgcolor: '#A5A6F6', borderRadius: 2.5, display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"Sesame Sleuth"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"OscarThaGrouch"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{"2/16/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"Rocko was found dead in his Calabasas apartment and Big Bird is going to get to the bottom of it."}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"700"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"500"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem
                sx={{ marginRight: '10px', bgcolor: '#A5A6F6', borderRadius: 2.5, display: 'flex', p: 1 }}
                style={{
                    fontSize: '48pt',
                    width: '100%'
                }}>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"Where's Wendy?"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"DonaldMcRonald"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '8pt' }}>{"3/23/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"Ever since the fries were sea salted, nobody's seen Wendy. Everyone's a suspect, even Dave himself..."}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"120"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 2 }} style={{ fontSize: '18pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"10"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>
        </List>;

    let storyFollowingCardList = "";
    // if (store) {
    storyFollowingCardList =
        <List sx={{ width: '100%' }} style={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
            {/* {
                store.lists.map((list) => (
                    <StoryCard
                        key={list._id}
                        startList={list}
                        selected={false}
                    />
                ))
            } */}
            <ListItem
                sx={{ marginBottom: '10px', bgcolor: '#A5A6F6', borderRadius: 2.5, display: 'flex', p: 1 }}
                style={{
                    fontSize: '10pt',
                    width: '100%'
                }}
            >
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"The Winds of Winter"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"GeorgeRRMartin"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '10pt' }}>{"10/2/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"The sixth installment in my A Song of Ice and Fire Series. I was waiting to upload this until StorySoft was up and running."}</Box>
                    <Box sx={{ height: '10%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"1000"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"5000"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem
                sx={{ marginBottom: '10px', bgcolor: '#A5A6F6', borderRadius: 2.5, display: 'flex', p: 1 }}
                style={{
                    fontSize: '10pt',
                    width: '100%'
                }}
            >
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"The Perfect Toast in Ten Minutes"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"GordonRamsay"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '10pt' }}>{"10/2/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"A short, delicious recipe, perfect for any occasion."}</Box>
                    <Box sx={{ height: '10%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"1000"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"5000"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem
                sx={{ marginBottom: '10px', bgcolor: '#A5A6F6', borderRadius: 2.5, display: 'flex', p: 1 }}
                style={{
                    fontSize: '10pt',
                    width: '100%'
                }}
            >
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"The Nightmare on Circle Road"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"KreddyFrueger"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '10pt' }}>{"10/2/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"There's an uber in the bus loop... And that's not the worst of it...There's an uber in the bus loop... And that's not the worst of it...There's an uber in the bus loop... And that's not the worst of it...There's an uber in the bus loop... And that's not the worst of it...There's an uber in the bus loop... And that's not the worst of it...There's an uber in the bus loop... And that's not the worst of it...There's an uber in the bus loop... And that's not the worst of it..."}</Box>
                    <Box sx={{ height: '10%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"1000"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"5000"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem
                sx={{ marginBottom: '10px', bgcolor: '#A5A6F6', borderRadius: 2.5, display: 'flex', p: 1 }}
                style={{
                    fontSize: '10pt',
                    width: '100%'
                }}>
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"Sesame Sleuth"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"OscarThaGrouch"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '10pt' }}>{"2/16/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"Rocko was found dead in his Calabasas apartment and Big Bird is going to get to the bottom of it."}</Box>
                    <Box sx={{ height: '100%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"700"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"500"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            <ListItem
                sx={{ marginBottom: '10px', bgcolor: '#A5A6F6', borderRadius: 2.5, display: 'flex', p: 1 }}
                style={{
                    fontSize: '10pt',
                    width: '100%'
                }}
            >
                <Box sx={{ paddingLeft: 1, paddingRight: 1, flexGrow: 1, fontFamily: 'Arial, sans-serif' }} style={{cursor: 'pointer'}}>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '16pt', fontWeight: 'bold' }}>{"The Winds of Winter"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '12pt' }}>{"GeorgeRRMartin"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '10pt' }}>{"10/2/22 10:13 AM"}</Box>
                    <Box sx={{ p: .5, flexGrow: 1 }} style={{ fontSize: '11pt' }}>{"The sixth installment in my A Song of Ice and Fire Series. I was waiting to upload this until StorySoft was up and running."}</Box>
                    <Box sx={{ height: '10%' }}>
                        <div id="like-area">
                            <span>
                                <IconButton>
                                    <ThumbUpOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"1000"}
                            </span>
                            <span>
                                <IconButton>
                                    <ThumbDownOffAltIcon sx={{ pt: 0 }} style={{ fontSize: '24pt' }} />
                                </IconButton>
                            </span>
                            <span className="like-display">
                                {"5000"}
                            </span>
                        </div>
                    </Box>
                </Box>
            </ListItem>

            
        </List>

    const examplePost = {
        name: 'Example Title',
        userData: {
            username: 'Example Author',
        },
        published: 'Example Published',
        summary: 'Example Description',
        likes: '100',
        dislikes: '23',
        imageUrl: 'https://st2.depositphotos.com/3765753/5349/v/600/depositphotos_53491489-stock-illustration-example-rubber-stamp-vector-over.jpg'
    }
    
    const sampleExploreListTags1 = { name: 'Example Tag 1', posts: [examplePost, examplePost, examplePost]};
    const sampleExploreListTags2 = { name: 'Example Tag 2', posts: [examplePost, examplePost, examplePost]};
    const sampleExploreListTags3 = { name: 'Example Tag 3', posts: [examplePost, examplePost, examplePost]};
    const sampleFollowingList = [examplePost, examplePost, examplePost, examplePost, examplePost, examplePost, examplePost];

    return (
        <div id="post-selector">
            {/* <div id="homescreen-divider"></div> */}
            <Explore exploreTags={[sampleExploreListTags1, sampleExploreListTags2, sampleExploreListTags3]}/>

            <Following posts={sampleFollowingList}/>



            {/* <div id="list-selector-list">
                {
                    listCard
                }
            </div> */}

        </div>)


}

export default HomeScreen;