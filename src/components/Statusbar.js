import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth';
import { ListViewMode } from '../store/index.js';

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const handleCreateList = () => {
        store.createNewList();
    };

    let text = "";
    // if (store.currentList)
    //     text = store.currentList.name;
    if (store.listViewMode === ListViewMode.MY_LISTS || store.currentList) {
        text = <div onClick={handleCreateList}><strong>+</strong> Your Lists</div>;
    } else if (store.listViewMode === ListViewMode.PUBLISHED_LISTS) {
        text = (store.search) ? "Published Lists: " + store.search : "Published Lists";
    } else if (store.listViewMode === ListViewMode.USER_LISTS) {
        text = "User Lists";
        // text = (store.search) ? "User Lists: " + store.search : "Enter User In Seach Bar";
    } else if (store.listViewMode === ListViewMode.COMMUNITY_LISTS) {
        text = (store.search) ? "Community Lists: " + store.search : "Community Lists";
    }

    let statusbar = <div id="top5-statusbar">
                         <Typography color={(store.currentList !== null) ? "#616161" : "default"} variant="h4" cursor="default">{text}</Typography>
                    </div> 
    
    if (auth.user == null)
        statusbar = "";

    return (
        <div>
            {statusbar}
        </div>
    );
}

export default Statusbar;