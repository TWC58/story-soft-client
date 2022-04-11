import { useContext, useState } from 'react'
import Top5ItemEdit from './Top5ItemEdit.js'
import List from '@mui/material/List';
import { Typography } from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import { useHistory } from 'react-router-dom'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [currentListNameText, setListNameText] = useState((store.currentList) ? store.currentList.name : "");
    const history = useHistory();

    let editItems = "";
    if (store.currentList) {
        editItems = 
            <List id="edit-items" sx={{ width: '100%', bgcolor: "blue" }}>
                {
                    store.currentList.items.map((item, index) => (
                        <Top5ItemEdit
                            key={'top5-item-' + (index+1)}
                            text={item}
                            index={index} 
                        />
                    ))
                }
            </List>;
    } else if (!auth.error) {
        //case where the current list was never fetched
        // let lastPath = history.location.pathname;
        // store.setCurrentList(lastPath.substring(lastPath.indexOf("/top5list/") + 10));
        store.loadMyLists();
    }

    function handleUpdateText(event) {
        // alert(event.target.value);
        setListNameText(event.target.value);
        store.updateListName(event.target.value);
    }

    function handleSave(event) {
        if (!currentListNameText) {
            auth.setError("A list name is required");
        } else {
            store.updateCurrentList();
        }
    }

    function handlePublish(event) {
        store.publishList();
    }

    function isIllegalItemName() {

        for (let i = 0; i < store.currentList.items.length; i++) {
            if (store.currentList.items[i] === "" || store.currentList.items[i] === "?")
                return true;

            for (let j = i + 1; j < store.currentList.items.length; j++) {
                if (store.currentList.items[i] === store.currentList.items[j])
                    return true;
            }
        }

        return false;
    }

    return (
        <div id="top5-workspace">
            
            <div id="workspace-edit">
            <TextField
                required
                id="list-name-edittext"
                name="list-name"
                className='edit-card-title'
                value={currentListNameText}
                onChange={handleUpdateText}
                inputProps={{style: {fontSize: 18}}}
                InputLabelProps={{style: {fontSize: 18}}}
            />
                {/* <div id="edit-numbering">
                    <div className="item-number"><Typography variant="h4">1.</Typography></div>
                    <div className="item-number"><Typography variant="h4">2.</Typography></div>
                    <div className="item-number"><Typography variant="h4">3.</Typography></div>
                    <div className="item-number"><Typography variant="h4">4.</Typography></div>
                    <div className="item-number"><Typography variant="h4">5.</Typography></div>
                </div> */}
                {editItems}
            </div>
            <div id="workspace-buttons">
                <Button color={(!currentListNameText) ? "error" : "success"} variant="contained" className="workspace-button" onClick={handleSave} disabled={!currentListNameText}>Save</Button>
                <Button color={(!currentListNameText) ? "error" : "success"} variant="contained" className="workspace-button" onClick={handlePublish} disabled={ (store.currentList) ?
                    !currentListNameText
                    || store.hasPublishedListName(currentListNameText)
                    || isIllegalItemName()
                    : true
                }>Publish</Button>
            </div>
        </div>
    )
}

export default WorkspaceScreen;